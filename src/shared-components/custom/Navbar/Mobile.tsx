import classNames from "classnames";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { MenuItem } from ".";
import styles from "./Navbar.module.scss";
import Cart from "../Cart";
import { MobileMenu } from "../MobileMenu";

interface Props {
  menuItems: MenuItem[];
}

export const MobileNavbar: React.FC<Props> = ({ menuItems }) => {
  return (
    <div className={styles["header-mobile"]}>
      <div className={styles["button-container"]}>
        <MobileMenu menuItems={menuItems} className={styles["menu-button"]} />
        <Cart className={styles["menu-button"]} />
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
