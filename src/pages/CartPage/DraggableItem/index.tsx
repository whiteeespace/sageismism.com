import { motion } from "framer-motion";
import { useMemo } from "react";
import Draggable from "react-draggable";
import { Image, useWindowView } from "whiteeespace";

import styles from "./DraggableItem.module.scss";

interface Props {
  id: string;
  index: number;
  totalNumber: number;
  src: string;
  maxX: number;
  maxY: number;
}

const DraggableItem: React.FC<Props> = ({ id, index, totalNumber, src, maxX, maxY }) => {
  const { isTabletOrMobile } = useWindowView();

  const width = useMemo(() => (isTabletOrMobile ? 250 : 350), [isTabletOrMobile]);

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: ((maxX - width) / totalNumber) * (index + 0.5), y: (maxY - width) / 2 }}
    >
      <div id={`drag-img-${id}`} style={{ zIndex: 10 + index }} className={styles["image-container"]}>
        <motion.div initial={{ scale: 0.1 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <Image src={src} draggable="false" alt="cart-item" style={{ width }} />
        </motion.div>
      </div>
    </Draggable>
  );
};

export default DraggableItem;
