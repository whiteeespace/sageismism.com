"use client";

import { Image, flattenConnection, useQuery } from "@whiteeespace/core";
import { motion, useInView, useAnimation } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { GET_LOOKBOOK } from "@utils/queries/get-lookbook";
import { GetLookbookQuery, GetLookbookQueryVariables } from "gql/graphql";

import styles from "./styles.module.scss";

const LookbookImage: React.FC<{ src: string }> = ({ src }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1 });
    }
  }, [controls, isInView]);

  return (
    <motion.div
      className={styles["lookbook-img-container"]}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      <Image className={styles["lookbook-img"]} src={src} alt="sage lookbook img" />
    </motion.div>
  );
};

const LookbookPage: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const [result] = useQuery<GetLookbookQuery, GetLookbookQueryVariables>({
    query: GET_LOOKBOOK,
    variables: { collectionHandle: handle ?? "" },
  });

  if (!result.data?.collection?.metafield?.references) {
    return <></>;
  }

  const lookbook = result.data.collection;
  const lookbookImages = flattenConnection(result.data.collection?.metafield?.references);

  return (
    <div className={styles["container"]}>
      <motion.h1
        className={styles["title"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {lookbook?.title.toUpperCase()}
      </motion.h1>
      {lookbookImages.map((lookbookImage, idx) => (
        <LookbookImage
          key={`lookbookImage-${idx}`}
          src={lookbookImage.__typename === "MediaImage" && lookbookImage.image?.url}
        />
      ))}
    </div>
  );
};

export default LookbookPage;
