import { graphql } from "gql";

export const GET_COLLECTION = graphql(`
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
`);
