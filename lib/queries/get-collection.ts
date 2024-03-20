import { GetCollectionQuery } from "@/gql/graphql";
import { graphql } from "gql";

export const getCollectionQuery = /* GraphQL */ `
  query GetCollection($collectionHandle: String!, $after: String) {
    collection(handle: $collectionHandle) {
      id
      products(first: 250, after: $after) {
        nodes {
          handle
          title
          availableForSale
          updatedAt
          image: metafield(namespace: "custom", key: "store_image") {
            reference {
              ... on MediaImage {
                image {
                  url
                }
              }
            }
          }
          label: metafield(namespace: "custom", key: "label_info") {
            value
          }
        }
      }
    }
  }
`;

export type ShopifyCollectionOperation = {
  data: {
    collection: GetCollectionQuery["collection"];
  };
  variables: {
    collectionHandle: string;
  };
};

export const GET_COLLECTION = graphql(getCollectionQuery);
