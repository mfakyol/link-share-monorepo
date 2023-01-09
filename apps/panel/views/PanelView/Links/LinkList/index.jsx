import { apiUrl } from "@packages/lib/config";
import Switch from "@packages/react-lib/components/Switch";
import http from "@packages/lib/http";
import { useDispatch } from "react-redux";
import classes from "./style.module.scss";
import LinkInput from "@packages/react-lib/components/LinkInput";
import { validateLinkTitle, validateUrl } from "@packages/lib/validators";
import { useCallback, useRef, useState, useId } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { removeLink, setPageLinks, updatePageLink } from "store/panelSlice";
import TrashIcon from "@packages/react-lib/icons/TrashIcon";
import DragIcon from "@packages/react-lib/icons/DragIcon";

function LinkList({ links = [], setLinks }) {
  const dispatch = useDispatch();

  const handleRemoveLink = useCallback(
    (linkId) => {
      try {
        http
          .postWithAuth(`${apiUrl}/link/remove`, {
            body: { linkId },
          })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.status) {
              dispatch(removeLink(linkId));
            }
          });
      } catch (error) {}
    },
    [dispatch]
  );

  function handleDragEnd(result) {
    if (!result.destination) return;

    const tempLinks = Array.from(links);
    const [reorderedItem] = tempLinks.splice(result.source.index, 1);
    tempLinks.splice(result.destination.index, 0, reorderedItem);
    setLinks(tempLinks);
    try {
      http
        .postWithAuth(`${apiUrl}/link/reorder`, { body: { reorderedLinkIds: tempLinks.map((l) => l._id) } })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            dispatch(setPageLinks(tempLinks));
          }
        });
    } catch (error) {}
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="links">
        {(provided) => (
          <ul className={classes.links} {...provided.droppableProps} ref={provided.innerRef}>
            {links.map((link, index) => (
              <LinkItem key={link._id} link={link} index={index} onRemoveLink={handleRemoveLink} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default LinkList;

const LinkItem = ({ link, index, onRemoveLink }) => {
  const dispatch = useDispatch();

  const hrefId = useId();
  const titleId = useId();

  const switchRef = useRef();
  const hrefInputRef = useRef();
  const titleInputRef = useRef();

  const [titleError, setTitleError] = useState(validateLinkTitle(link.title));
  const [hrefError, setHrefError] = useState(validateUrl(link.href));

  const handleUpdate = () => {
    if (
      titleInputRef.current.value != link.title ||
      hrefInputRef.current.value != link.href ||
      switchRef.current.checked != link.show
    ) {
      let isValid = true;
      const urlValidationError = validateUrl(hrefInputRef.current.value);
      const titleValidationError = validateLinkTitle(titleInputRef.current.value);
      setHrefError(urlValidationError);
      setTitleError(titleValidationError);

      if (urlValidationError) isValid = false;
      if (titleValidationError) isValid = false;

      try {
        http
          .postWithAuth(`${apiUrl}/link/update`, {
            body: {
              ...link,
              title: titleInputRef.current.value,
              href: hrefInputRef.current.value,
              show: switchRef.current.checked,
              isValid,
            },
          })
          .then((res) => res.json())
          .then((res) => {
            if (res.status) {
              dispatch(
                updatePageLink({
                  ...link,
                  title: titleInputRef.current.value,
                  href: hrefInputRef.current.value,
                  show: switchRef.current.checked,
                  isValid,
                })
              );
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Draggable draggableId={link._id} index={index}>
      {(provided) => (
        <li className={classes.link} ref={provided.innerRef} {...provided.draggableProps}>
          <div className={classes.drag} {...provided.dragHandleProps}>
            <DragIcon className={classes.dragIcon} />
          </div>
          <div className={classes.content}>
            <div className={classes.inputs}>
              <div className={classes.inputRow}>
                <label className={classes.label} htmlFor={titleId}>
                  Title:
                </label>

                <LinkInput
                  id={titleId}
                  defaultValue={link.title}
                  error={titleError}
                  ref={titleInputRef}
                  onBlur={handleUpdate}
                />
              </div>
              <div className={classes.inputRow}>
                <label className={classes.label} htmlFor={hrefId}>
                  Link:
                </label>

                <LinkInput
                  id={hrefId}
                  defaultValue={link.href}
                  error={hrefError}
                  ref={hrefInputRef}
                  onBlur={handleUpdate}
                />
              </div>
            </div>

            <div className={classes.settings}>
              <Switch className={classes.switch} ref={switchRef} defaultChecked={link.show} onChange={handleUpdate} />
              <TrashIcon className={classes.deleteIcon} onClick={() => onRemoveLink(link._id)} />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
