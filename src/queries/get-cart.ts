import { graphql } from "gql";

export const GET_CART = graphql(`
  query GetCart($id: ID!) {
    cart(id: $id) {
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        subtotalAmountEstimated
        totalTaxAmount {
          amount
          currencyCode
        }
        totalTaxAmountEstimated
        totalAmount {
          amount
          currencyCode
        }
        totalAmountEstimated
      }
      lines(first: 100) {
        nodes {
          quantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              availableForSale
              image {
                url
                altText
              }
              product {
                handle
                title
              }
              title
            }
          }
        }
      }
    }
  }
`);
