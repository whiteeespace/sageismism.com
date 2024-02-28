import { useQuery } from "@apollo/client";
import { flattenConnection } from "@shopify/hydrogen-react";
import classNames from "classnames";
import { motion, useInView, useAnimation } from "framer-motion";
import { GetLookbookQuery, GetLookbookQueryVariables } from "gql/graphql";
import { GET_LOOKBOOK } from "queries/get-lookbook";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import styles from "./LookbookPage.module.scss";

import "lazysizes";

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
    <motion.img
      ref={ref}
      className={classNames(styles["lookbook-img"], "lazyload", "lazyloaded")}
      src={`${src}&width=10`}
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      alt="sage lookbook img"
      data-sizes="auto"
      data-srcset={`${src}&width=300 300w,
            ${src}&width=500 500w,
            ${src}&width=600 600w,
            ${src}&width=800 800w`}
    />
  );
};

const LookbookPage: React.FC = () => {
  const { handle } = useParams();
  const { data: lookbookData, loading: isLookbookLoading } = useQuery<
    GetLookbookQuery,
    GetLookbookQueryVariables
  >(GET_LOOKBOOK, {
    variables: { collectionHandle: handle ?? "" },
  });

  console.log(handle, lookbookData);

  if (isLookbookLoading || !lookbookData?.collection?.metafield?.references) {
    return <></>;
  }

  const lookbook = lookbookData.collection;
  const lookbookImages = flattenConnection(lookbookData.collection?.metafield?.references);

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
      {lookbookImages.map((lookbookImage) => (
        <LookbookImage src={lookbookImage.__typename === "MediaImage" && lookbookImage.image?.url} />
      ))}
    </div>
  );
};

export default LookbookPage;
