import classNames from "classnames";
import { motion } from "framer-motion";

import styles from "./Loader.module.scss";

interface Props {
  className?: string;
}

const Loader: React.FC<Props> = ({ className }) => {
  return (
    <motion.img
      src={`/images/loader.gif`}
      alt={"sageism-logo"}
      className={classNames(styles["logo"], className)}
    />
  );
};

export default Loader;
