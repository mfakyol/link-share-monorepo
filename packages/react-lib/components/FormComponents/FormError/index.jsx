import classes from "./style.module.scss";
import CloseIcon from "../../../icons/CloseIcon";

function FormError({ error, setError }) {
  return (
    error && (
      <p className={classes.error}>
        <span className={classes.errorText}>{error}</span>
        <CloseIcon className={classes.closeIcon} onClick={() => setError("")} />
      </p>
    )
  );
}

export default FormError;
