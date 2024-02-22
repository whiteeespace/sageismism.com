import classNames from "classnames";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "shared-components/core/Button";

import styles from "./Navbar.module.scss";

interface MenuItem {
  title: string;
  to: string;
  disabled?: boolean;
}

interface Props {
  menuItems: MenuItem[];
}

export const MobileNavbar: React.FC<Props> = () => {
  return (
    <div className={styles["header-mobile"]}>
      <div className={styles["button-container"]}>
        <Button variant="secondary" className={styles["menu-button"]}>
          menu
        </Button>
        <Button variant="secondary" className={styles["menu-button"]}>
          cart
        </Button>
      </div>
      <Link className={styles["shop-link"]} to={"/"}>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          src={`${process.env.PUBLIC_URL}/images/loading-logo.png`}
          alt={"logo"}
          className={classNames(styles["menu-logo"], "lazyload", "lazyloaded")}
          data-sizes="auto"
          data-srcset={`${process.env.PUBLIC_URL}/images/logo-small.gif 300w, 
          ${process.env.PUBLIC_URL}/images/logo-mobile.gif 600w, 
          ${process.env.PUBLIC_URL}/images/logo.gif 800w`}
        />
      </Link>
    </div>
  );
};
