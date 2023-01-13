import classes from "./style.module.scss";
import SocialIcon from "@packages/react-lib/components/SocialIcon";

function SocialLink({ social, theme, color, onClick }) {
  return (
    <a className={classes.social} rel="noopener noreferrer nofollow external" target="_blank" href={social.href}>
      <SocialIcon
        theme={theme}
        type={social.type}
        style={{ fill: social.type != "color" ? color : color }}
        onClick={onClick}
      />
    </a>
  );
}

export default SocialLink;
