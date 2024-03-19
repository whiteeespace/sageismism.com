import { graphql } from "gql";

export const GET_LOOKBOOK = graphql(`
  query GetLookbook($collectionHandle: String!) {
    collection(handle: $collectionHandle) {
      id
      title
      metafield(namespace: "custom", key: "lookbook") {
        references(first: 50) {
          nodes {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`);
