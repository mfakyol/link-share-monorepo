import Link from "next/link";
import { useState } from "react";
import classes from "./style.module.scss";
import BurgerIcon from '@packages/react-lib/icons/BurgerIcon'

function PanelNavbar() {
  const [show, setShow] = useState(false);

  return (
    <header className={classes.panelNavbar}>
      <Link href="/panel/links" shallow={true} className={classes.logoWrapper}>
        <img className={classes.logo} src="/logo-small.svg" alt="" />
      </Link>

      <BurgerIcon className={classes.burgerIcon} onClick={() => setShow((prev) => !prev)} />

      <ul className={`${classes.tabs} ${show ? classes.show : ""}`}>
        <li className={classes.tab}>
          <Link href="/panel/links" shallow={true} className={classes.tabContent} onClick={() => setShow(false)}>
            Links
          </Link>
        </li>
        <li className={classes.tab}>
          <Link href="/panel/social" shallow={true} className={classes.tabContent} onClick={() => setShow(false)}>
            Social
          </Link>
        </li>
        <li className={classes.tab}>
          <Link href="/panel/appearance" shallow={true} className={classes.tabContent} onClick={() => setShow(false)}>
            Appearance
          </Link>
        </li>
        <li className={classes.tab}>
          <Link href="/panel/settings" shallow={true} className={classes.tabContent} onClick={() => setShow(false)}>
            Settings
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default PanelNavbar;
