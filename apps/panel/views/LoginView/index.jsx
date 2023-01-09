import Link from "next/link";
import Router from "next/router";
import Navbar from "@components/Navbar";
import classes from "./style.module.scss";
import { useCallback, useState } from "react";
import { validateEmail } from "@packages/lib/validators";
import Form from "@packages/react-lib/components/FormComponents/Form";
import { authService } from "services/auth.service";
import FormTitle from "@packages/react-lib/components/FormComponents/FormTitle";
import FormLabel from "@packages/react-lib/components/FormComponents/FormLabel";
import FormButton from "@packages/react-lib/components/FormComponents/FormButton";
import FormTextInput from "@packages/react-lib/components/FormComponents/FormTextInput";
import FormError from "@packages/react-lib/components/FormComponents/FormError";
import FormPasswordInput from "@packages/react-lib/components/FormComponents/FormPasswordInput";

function LoginView() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");

  const login = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await authService.login(email, password);
        if (response.ok) {
          const data = await response.json();
          if (!data.status) {
            setError(data.message);
          } else {
            localStorage.setItem("token", data.token);
            Router.push("/panel");
          }
        }
      } catch (error) {
        setError("Unknown Error occured.");
      }
    },
    [email, password]
  );

  const handleEmailOnChange = useCallback((e) => {
    setEmailError("");
    const errorMessage = validateEmail(e.target.value);
    if (errorMessage) setEmailError(errorMessage);
    setEmail(e.target.value);
  }, []);

  const handlePasswordOnChange = useCallback((e) => {
    setPasswordError("");

    if (e.target.value.length == 0) setPasswordError("Please enter password.");
    setPassword(e.target.value);
  }, []);

  return (
    <div className={classes.page}>
      <Navbar hideAuthButtons={true} />
      <Form onSubmit={login}>
        <FormTitle>Create your Links account</FormTitle>
        <FormError error={error} setError={setError} />
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormTextInput id="email" placeholder="Email" onChange={handleEmailOnChange} value={email} error={emailError} />
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormPasswordInput
          id="password"
          placeholder="Password"
          onChange={handlePasswordOnChange}
          value={password}
          error={passwordError}
        />
        <FormButton disabled={!email || emailError || !password || passwordError} className={classes.button}>
          Sign Up
        </FormButton>

        <Link href="/forgotpassword" className={classes.forgotPassword}>
          forgot password?
        </Link>

        <p className={classes.registerText}>
          Don’t have an account? <Link href="signup">Sign up.</Link>
        </p>
      </Form>
    </div>
  );
}

export default LoginView;
