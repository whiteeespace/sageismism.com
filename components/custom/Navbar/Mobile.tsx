"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { MenuItem } from ".";
import logo from "./images/logo.gif";
import styles from "./styles.module.scss";
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
      <Link className={styles["shop-link"]} href={"/"}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Image src={logo} alt={"logo"} className={styles["logo"]} />
        </motion.div>
      </Link>
    </div>
  );
};
