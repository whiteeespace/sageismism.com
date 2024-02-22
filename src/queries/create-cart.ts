import { graphql } from "gql";

export const CREATE_CART = graphql(`
  mutation cartCreate {
    cartCreate {
      userErrors {
        field
        message
      }
    }
  }
`);
