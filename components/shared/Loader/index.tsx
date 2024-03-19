"use client";

import classNames from "classnames";
import { motion } from "framer-motion";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
}

const Loader: React.FC<Props> = ({ className }) => {
  return (
    <motion.img src={`/loader.gif`} alt={"sageism-logo"} className={classNames(styles["logo"], className)} />
  );
};

export default Loader;
