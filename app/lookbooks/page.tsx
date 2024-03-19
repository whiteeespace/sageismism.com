"use client";

import { useQuery } from "@apollo/client";
import { flattenConnection } from "@whiteeespace/core";
import { motion } from "framer-motion";
import { Suspense } from "react";

import { GET_LOOKBOOK_LIST } from "@utils/queries/get-lookbook-list";
import { GetLookbookListQuery } from "gql/graphql";

import Sphere from "./Sphere";
import styles from "./styles.module.scss";

const LookbooksPage: React.FC = () => {
  const { data: lookbooksData, loading: isLookbooksLoading } =
    useQuery<GetLookbookListQuery>(GET_LOOKBOOK_LIST);

  if (isLookbooksLoading || !lookbooksData || !lookbooksData.metaobject?.lookbooks?.references) {
    return <></>;
  }

  const lookbooks = flattenConnection(lookbooksData.metaobject?.lookbooks.references);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className={styles["container"]}
    >
      {lookbooks.map(
        (lookbook) =>
          lookbook.__typename === "Collection" && (
            <Suspense
              fallback={<h6 className="loading-text">Loading lookbook, please wait...</h6>}
              key={lookbook.id}
            >
              <Sphere handle={lookbook.handle} src={lookbook.image?.url} />
            </Suspense>
          )
      )}
    </motion.div>
  );
};

export default LookbooksPage;
