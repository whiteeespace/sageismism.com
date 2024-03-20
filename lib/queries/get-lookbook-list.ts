import { GetLookbookListQuery } from "@/gql/graphql";
import { graphql } from "gql";

export const getLookbooksQuery = /* GraphQL */ `
  query GetLookbookList {
    metaobject(handle: { handle: "lookbooks", type: "lookbooks" }) {
      lookbooks: field(key: "lookbooks") {
        references(first: 50) {
          nodes {
            ... on Collection {
              __typename
              id
              handle
              title
              descriptionHtml
              seo {
                title
                description
              }
              image {
                url
              }
              updatedAt
            }
          }
        }
      }
    }
  }
`;

export type ShopifyLookbooksOperation = {
  data: {
    metaobject: GetLookbookListQuery["metaobject"];
  };
};

export const GET_LOOKBOOK_LIST = graphql(getLookbooksQuery);
