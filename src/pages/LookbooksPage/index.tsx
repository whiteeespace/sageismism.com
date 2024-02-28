import { useQuery } from "@apollo/client";
import { flattenConnection } from "@shopify/hydrogen-react";
import { motion } from "framer-motion";
import { GetLookbookListQuery } from "gql/graphql";
import { GET_LOOKBOOK_LIST } from "queries/get-lookbook-list";
import { Suspense } from "react";

import styles from "./LookbooksPage.module.scss";
import Sphere from "./Sphere";

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
