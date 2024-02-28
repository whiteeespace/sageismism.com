import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import Button from "shared-components/core/Button";

import { MenuItem } from ".";
import styles from "./Navbar.module.scss";
import Cart from "../Cart";

interface Props {
  menuItems: MenuItem[];
}

export const DesktopNavbar: React.FC<Props> = ({ menuItems }) => {
  const navigate = useNavigate();
  return (
    <div className={styles["header-desktop"]}>
      <Link to={"/"}>
        <img
          src={`${process.env.PUBLIC_URL}/images/loading-logo.png`}
          alt={"logo"}
          className={classNames(styles["logo"], "lazyload", "lazyloaded")}
          data-sizes="auto"
          data-srcset={`${process.env.PUBLIC_URL}/images/logo-small.gif 300w, 
          ${process.env.PUBLIC_URL}/images/logo-mobile.gif 600w, 
          ${process.env.PUBLIC_URL}/images/logo.gif 800w`}
        />
      </Link>

      <div className={styles["menu-container"]}>
        {menuItems.map((menuItem) => (
          <Button
            variant="secondary"
            onClick={() => navigate(menuItem.to)}
            key={menuItem.title}
            disabled={menuItem.disabled}
          >
            <div className={styles["menu-item"]}>{menuItem.title}</div>
          </Button>
        ))}
        <Cart className={styles["menu-item"]} />
      </div>
    </div>
  );
};
