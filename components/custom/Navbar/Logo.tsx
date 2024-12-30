"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import logo from "./images/sage-logo.png";
import styles from "./styles.module.scss";

const Logo: React.FC = () => {
  return (
    <Link className={styles["shop-link"]} href={"/"}>
      <motion.div
        className={styles["menu-logo"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={logo}
          alt={"logo"}
          placeholder={"blur"}
          blurDataURL={logo.blurDataURL}
          priority
          className={styles["logo"]}
        />
      </motion.div>
    </Link>
  );
};

export default Logo;
