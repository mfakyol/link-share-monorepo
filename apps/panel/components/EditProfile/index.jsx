import Input from "@packages/react-lib/components/Input";
import Label from "@packages/react-lib/components/Label";
import TextArea from "@packages/react-lib/components/TextArea";
import { useSelector } from "react-redux";
import classes from "./style.module.scss";
import { useCallback, useRef, useState } from "react";
import http from "@packages/lib/http";
import { apiUrl } from "@packages/lib/config";
import { useDispatch } from "react-redux";
import { setProfileDescription, setProfileTitle } from "store/panelSlice";
import Card from "@components/Card";
import ProfileAvatar from "./ProfileAvatar";

const TITLE_MAX_LENGTH = 30;
const DESCRITION_MAX_LENGTH = 160;

function EditProfile({ page }) {
  const titleRef = useRef();
  const dispatch = useDispatch();
  const descriptionRef = useRef();

  const [title, setTitle] = useState(page?.profileTitle || "");
  const [description, setDescription] = useState(page?.profileDescription || "");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleTitleChange = useCallback((e) => {
    if (e.target.value.length > TITLE_MAX_LENGTH) setTitleError("Title cannot be longer than 30 character.");
    else setTitleError("");
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    if (e.target.value.length > DESCRITION_MAX_LENGTH)
      setDescriptionError("Description cannot be longer than 80 character.");
    else setDescriptionError("");
    setDescription(e.target.value);
  }, []);

  const handleTitleOnBlur = useCallback(
    (e) => {
      if (!e.target.value) return setTitleError("Title cannot be empty");
      if (e.target.value.length > TITLE_MAX_LENGTH) return;
      if (page.profileTitle != e.target.value) {
        http
          .postWithAuth(`${apiUrl}/appearance/title`, { body: { title: e.target.value } })
          .then((res) => {
            if (res.status) dispatch(setProfileTitle(e.target.value));
            else console.log(res?.message);
          })
          .catch((e) => console.log("Unknown error occured."));
      }
    },
    [page, dispatch]
  );
  const handleDescriptionOnBlur = useCallback(
    (e) => {
      if (!e.target.value) return console.log("cannot be empty.");
      if (page.profileDescription != e.target.value) {
        http
          .postWithAuth(`${apiUrl}/appearance/description`, { body: { description: e.target.value } })
          .then((res) => {
            if (res.status) dispatch(setProfileDescription(e.target.value));
            else console.log(res?.message);
          })
          .catch((e) => console.log("Unknown error occured."));
      }
    },
    [page, dispatch]
  );

  return (
    <Card title="Profile">
      <ProfileAvatar avatarImage={page.profileImage} profileTitle={page.profileTitle} endPoint={page.endPoint} />

      <Label className={classes.label} htmlFor="title">
        Title
      </Label>
      <Input
        ref={titleRef}
        value={title}
        className={classes.input}
        error={titleError}
        id="title"
        name="title"
        type="text"
        onChange={handleTitleChange}
        onBlur={handleTitleOnBlur}
      />
      <Label className={classes.label} htmlFor="description">
        Description
      </Label>
      <TextArea
        ref={descriptionRef}
        value={description}
        error={descriptionError}
        id="description"
        name="description"
        className={classes.textarea}
        onBlur={handleDescriptionOnBlur}
        onChange={handleDescriptionChange}
      ></TextArea>
      <p className={classes.descriptionLength}>{`${description.length} / ${DESCRITION_MAX_LENGTH}`}</p>
    </Card>
  );
}

export default EditProfile;
