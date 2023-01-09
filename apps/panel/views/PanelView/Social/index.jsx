import http from "@packages/lib/http";
import classes from "./style.module.scss";
import { apiUrl } from "@packages/lib/config";
import { useState, useCallback } from "react";
import NewSocialPopup from "./NewSocialPopup";
import socialList from "@constants/socialList";
import { Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import AddOrEditSocialPopup from "./AddOrEditSocialPopup";
import DragIcon from "@packages/react-lib/icons/DragIcon";
import Switch from "@packages/react-lib/components/Switch";
import PencilIcon from "@packages/react-lib/icons/PencilIcon";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { setPageSocials, setPageSocialShow } from "store/panelSlice";

import SocialIcon from "@packages/react-lib/components/SocialIcon";

function Social() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.panel.page);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState();
  const [showNewSocialPopup, setShowNewSocialPopup] = useState(false);

  const handleOnBack = useCallback(() => {
    setSelectedSocial(undefined);
    setShowNewSocialPopup(true);
  }, []);

  const findSocialDetail = useCallback((social) => {
    return { ...social, ...socialList.find((s) => s.type == social.type) };
  }, []);

  async function handleOnDragEnd(result) {
    if (!result.destination) return;

    const tempSocials = Array.from(page.socials);
    const [reorderedItem] = tempSocials.splice(result.source.index, 1);
    tempSocials.splice(result.destination.index, 0, reorderedItem);

    try {
      const response = await http
        .postWithAuth(`${apiUrl}/social/reorder`, { body: { reorderedSocials: tempSocials } })
        .then((res) => res.json());

      if (response.status) {
        dispatch(setPageSocials(tempSocials));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toggleShowSocial = useCallback(
    async (e, social) => {
      try {
        const response = await http.postWithAuth(`${apiUrl}/social/show`, {
          body: { id: social._id, show: e.target.checked },
        });
        if (response.status) {
          dispatch(setPageSocialShow({ id: social._id, show: e.target.checked }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const handleOnClickEdit = useCallback((e, social) => {
    setIsEdit(true);
    setSelectedSocial(social);
  }, []);

  const handleOnClickAdd = useCallback((e) => {
    setShowNewSocialPopup(true);
    setIsEdit(false);
  }, []);

  return (
    <>
      <NewSocialPopup
        show={showNewSocialPopup}
        setSelectedSocial={setSelectedSocial}
        selectedSocial={selectedSocial}
        setShow={setShowNewSocialPopup}
      />
      <AddOrEditSocialPopup
        isEdit={isEdit}
        social={selectedSocial}
        setSocial={setSelectedSocial}
        onBack={isEdit ? null : handleOnBack}
      />
      <div className={classes.socialWrapper}>
        <button className={classes.addSocialButton} onClick={() => handleOnClickAdd(true)}>
          Add New Social Icon
        </button>

        {page && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="socials">
              {(provided) => (
                <ul className={classes.socialList} {...provided.droppableProps} ref={provided.innerRef}>
                  {page.socials
                    .map((social) => findSocialDetail(social))
                    .map((social, index) => (
                      <Draggable draggableId={social.type} key={social.type} index={index}>
                        {(provided) => (
                          <li className={classes.socialItem} ref={provided.innerRef} {...provided.draggableProps}>
                            <div className={classes.drag} {...provided.dragHandleProps}>
                              <DragIcon className={classes.dragIcon} />
                            </div>
                            <SocialIcon type={social.type} theme="color" className={classes.socialIcon} />
                            <span className={classes.socialName}>{social.name}</span>
                            <PencilIcon className={classes.pencilIcon} onClick={(e) => handleOnClickEdit(e, social)} />
                            <Switch defaultChecked={social.show} onChange={(e) => toggleShowSocial(e, social)} />
                          </li>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </>
  );
}

export default Social;
