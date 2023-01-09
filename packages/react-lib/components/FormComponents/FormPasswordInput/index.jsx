import { useState } from "react";
import classes from "./style.module.scss";
import FormTextInput from "../FormTextInput";
import EyeOpenIcon from "../../../icons/EyeOpenIcon";
import EyeCloseIcon from "../../../icons/EyeCloseIcon";

function FormPasswordInput({ className = "", ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormTextInput
      type={showPassword ? "text" : "password"}
      inputWrapperClassName={classes.passwordInputWrapper}
      autoComplete="off"
      {...rest}
    >
      {showPassword ? (
        <EyeOpenIcon className={classes.eye} onClick={() => setShowPassword(false)} />
      ) : (
        <EyeCloseIcon className={classes.eye} onClick={() => setShowPassword(true)} />
      )}
    </FormTextInput>
  );
}

export default FormPasswordInput;
