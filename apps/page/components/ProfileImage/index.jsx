import { apiUrl } from "@packages/lib/config";
import classes from "./style.module.scss";

export default function ProfileImage({ profileData }) {
  return (
    <div className={classes.profileImageWrapper} style={profileData?.styles?.profileImage}>
      {profileData.profileImage ? (
        <img
          className={classes.profileImage}
          src={`${apiUrl}/${profileData.profileImage}`}
          alt={profileData.profileTitle}
          title={profileData.profileTitle}
        />
      ) : (
        <span className={classes.firstLetter} style={profileData?.style?.profileLetterImage}>{profileData?.profileTitle?.[0]}</span>
      )}
    </div>
  );
}
