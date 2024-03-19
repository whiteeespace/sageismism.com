import { graphql } from "gql";

export const GET_LOOKBOOK_LIST = graphql(`
  query GetLookbookList {
    metaobject(handle: { handle: "lookbooks", type: "lookbooks" }) {
      lookbooks: field(key: "lookbooks") {
        references(first: 50) {
          nodes {
            ... on Collection {
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
            }
          }
        }
      }
    }
  }
`);
