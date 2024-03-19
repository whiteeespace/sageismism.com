"use client";

import classNames from "classnames";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { Gender } from "@utils/types/gender";
import { LabelType } from "@utils/types/label";
import { ProductLabel } from "@utils/types/productLabel";

import "lazysizes";

import styles from "./styles.module.scss";

interface Props {
  src?: string;
  name: string;
  productLabel?: ProductLabel;
  className?: string;
}

const Item: React.FC<Props> = ({ src, name, productLabel, className }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1 });
    }
  }, [controls, isInView]);

  return (
    <motion.div className={classNames(styles["item-container"], className)} transition={{ duration: 0.5 }}>
      {productLabel && (
        <>
          {(productLabel?.type === LabelType.TOP || productLabel?.type === LabelType.HEAD) && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={controls}
              transition={{ duration: 1, delay: 0.5 }}
              width={50}
              className={classNames(styles["arrow-up"], {
                [styles["arrow-up--man--head"]]:
                  productLabel?.type === LabelType.HEAD && productLabel?.gender === Gender.MAN,
                [styles["arrow-up--man--top"]]:
                  productLabel?.type === LabelType.TOP && productLabel?.gender === Gender.MAN,
                [styles["arrow-up--woman--head"]]:
                  productLabel?.type === LabelType.HEAD && productLabel?.gender === Gender.WOMAN,
                [styles["arrow-up--woman--top"]]:
                  productLabel?.type === LabelType.TOP && productLabel?.gender === Gender.WOMAN,
              })}
              src={`/shop/arrow-up.svg`}
              alt={"arrow"}
            />
          )}
          {productLabel?.type === LabelType.BOTTOM && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={controls}
              transition={{ duration: 1, delay: 0.5 }}
              width={50}
              className={classNames(styles["arrow-down"], {
                [styles["arrow-down--man"]]: productLabel?.gender === Gender.MAN,
                [styles["arrow-down--woman"]]: productLabel?.gender === Gender.WOMAN,
              })}
              src={`/shop/arrow-down.svg`}
              alt={"arrow"}
            />
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ duration: 1, delay: 0.5 }}
            className={classNames(styles["label"], {
              [styles["label--man--head"]]:
                productLabel?.type === LabelType.HEAD && productLabel?.gender === Gender.MAN,
              [styles["label--man--top"]]:
                productLabel?.type === LabelType.TOP && productLabel?.gender === Gender.MAN,
              [styles["label--man--bottom"]]:
                productLabel?.type === LabelType.BOTTOM && productLabel?.gender === Gender.MAN,
              [styles["label--woman--head"]]:
                productLabel?.type === LabelType.HEAD && productLabel?.gender === Gender.WOMAN,
              [styles["label--woman--top"]]:
                productLabel?.type === LabelType.TOP && productLabel?.gender === Gender.WOMAN,
              [styles["label--woman--bottom"]]:
                productLabel?.type === LabelType.BOTTOM && productLabel?.gender === Gender.WOMAN,
            })}
          >
            {name}
          </motion.div>
        </>
      )}
      <motion.img
        ref={ref}
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 1 }}
        src={`${src}&width=10`}
        className={classNames(styles["image"], "lazyload", "lazyloaded")}
        alt="sage img"
        data-sizes="auto"
        data-srcset={`${src}&width=300 300w,
          ${src}&width=600 600w,
          ${src}&width=800 800w`}
      />
    </motion.div>
  );
};

export default Item;
