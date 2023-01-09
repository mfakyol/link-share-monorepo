import Popup from "@components/Popup";
import classes from "./style.module.scss";
import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import socialListData from "@constants/socialList";
import ArrowIcon from "@packages/react-lib/icons/ArrowIcon";
import SocialIcon from "@packages/react-lib/components/SocialIcon";

function NewSocialPopup({ show, setShow, setSelectedSocial }) {
  const socials = useSelector((state) => state.panel.page.socials);

  const handleOnClick = useCallback(
    (e, social) => {
      setSelectedSocial(social);
      setShow(false);
    },
    [setShow, setSelectedSocial]
  );

  const socialList = useMemo(() => {
    return socialListData.map((data) => {
      return { ...data, isExist: socials?.some((social) => social.type == data.type) };
    });
  }, [socials]);

  return (
    <>
      <Popup show={show} onClose={() => setShow(false)} title="Add Social Icon">
        <ul className={classes.socialList}>
          {socialList.map((social) => (
            <li
              key={social.type}
              className={`${classes.socialItem} ${social.isExist ? classes.exist : ""}`}
              onClick={(e) => handleOnClick(e, social)}
            >
              <SocialIcon type={social.type} theme="color" className={classes.socialIcon} />
              <span className={classes.socialName}>{social.name}</span>
              {social.isExist ? (
                <span className={classes.existText}>Exist</span>
              ) : (
                <ArrowIcon className={classes.arrowIcon} />
              )}
            </li>
          ))}
        </ul>
      </Popup>
    </>
  );
}

export default NewSocialPopup;
