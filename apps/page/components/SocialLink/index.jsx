import classes from "./style.module.scss";
import SocialIcon from "@packages/react-lib/components/SocialIcon";

function SocialLink({ social, style }) {
  return (
    <a className={classes.social} rel="noopener noreferrer nofollow external" target="_blank" href={social.href}>
      <SocialIcon theme={style} type={social.type} />
    </a>
  );
}

export default SocialLink;
