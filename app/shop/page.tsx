"use client";

import { useQuery } from "@apollo/client";
import { flattenConnection } from "@whiteeespace/core";
import classNames from "classnames";
import Link from "next/link";

import Item from "@/components/shared/Item";
import { GET_COLLECTION } from "@utils/queries/get-collection";
import { ProductLabel } from "@utils/types/productLabel";
import { GetCollectionQuery, GetCollectionQueryVariables } from "gql/graphql";

import styles from "./styles.module.scss";

const ShopPage = () => {
  const { data: productData } = useQuery<GetCollectionQuery, GetCollectionQueryVariables>(GET_COLLECTION, {
    variables: { collectionHandle: "all-products" },
  });

  if (!productData?.collection?.products) {
    return <></>;
  }

  const products = flattenConnection(productData?.collection?.products);

  return (
    <div className={classNames(styles["container"])}>
      <div className={classNames(styles["products"])}>
        {products.map((product) => {
          const labelInfo = product.label?.value
            ? (JSON.parse(product.label.value) as ProductLabel)
            : undefined;
          return (
            <Link href={`/product/${product.handle}`} key={product.handle}>
              <Item
                src={
                  product.image?.reference?.__typename === "MediaImage" && product.image?.reference.image?.url
                }
                name={product.title}
                productLabel={labelInfo}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ShopPage;
