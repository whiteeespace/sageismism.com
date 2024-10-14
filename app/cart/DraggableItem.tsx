import { Image } from "@whiteeespace/core";
import { motion } from "framer-motion";

import styles from "./styles.module.scss";

interface Props {
  id: string;
  index: number;
  totalNumber: number;
  src: string;
  maxX: number;
  maxY: number;
}

const DraggableItem: React.FC<Props> = ({ index, totalNumber, src, maxX, maxY }) => {
  const width = Math.min(maxX, maxY);
  const direction = Math.random() > 0.5 ? 1 : -1;
  const randomRotation = Math.random() * 180 * direction;

  return (
    <div style={{ zIndex: 10 + index }} className={styles["image-container"]}>
      <motion.div
        initial={{ scale: 0.1 }}
        animate={{
          scale: 1,
        }}
        transition={{ duration: 0.5 }}
        style={{
          rotate: randomRotation,
          x: ((maxX - width) / totalNumber) * (index + 0.5),
          y: (maxY - width) / 2,
        }}
      >
        <Image src={src} draggable="false" alt="cart-item" style={{ width }} />
      </motion.div>
    </div>
  );
};

export default DraggableItem;
