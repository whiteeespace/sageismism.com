"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import loadingLogo from "./images/loading-logo.png";
import logo from "./images/logo.gif";
import styles from "./styles.module.scss";

const Logo: React.FC = () => {
  return (
    <Link className={styles["shop-link"]} href={"/"}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Image
          src={logo}
          alt={"logo"}
          placeholder={"blur"}
          blurDataURL={loadingLogo.src}
          priority
          className={styles["logo"]}
        />
      </motion.div>
    </Link>
  );
};

export default Logo;
