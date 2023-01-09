import Link from "next/link";
import Logo from "@packages/react-lib/components/Logo";
import classes from "./style.module.scss";

function Navbar({ hideAuthButtons = false }) {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logoWrapper}>
        <Logo className={classes.logo} />
      </Link>

      {hideAuthButtons ? null : (
        <nav className={classes.nav}>
          <Link href="/login" className={classes.login}>
            Login
          </Link>
          <Link href="/signup" className={classes.signUp}>
            Sign Up
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
