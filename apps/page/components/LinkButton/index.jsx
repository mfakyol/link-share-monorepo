
import classes from "./style.module.scss";

function LinkButton({ href, title, onClick, ...rest }) {


  return (
    <a
      className={classes.link}
      rel="noopener noreferrer nofollow external"
      target="_blank"
      href={href}
      {...rest}
      onClick={onClick}
    >
      {title}
    </a>
  );
}

export default LinkButton;
