import { graphql } from "gql";

export const GET_PRODUCT = graphql(`
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      availableForSale
      descriptionHtml
      featuredImage {
        url
        altText
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 100) {
        edges {
          node {
            url
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      modelInfo: metafield(namespace: "custom", key: "model_information") {
        type
        value
      }
      sizeChart: metafield(namespace: "custom", key: "size_chart") {
        type
        value
      }
      maleModel: metafield(namespace: "custom", key: "male_model") {
        type
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
      femaleModel: metafield(namespace: "custom", key: "female_model") {
        type
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
      styledWith: metafield(namespace: "custom", key: "styled_with") {
        type
        references(first: 50) {
          nodes {
            ... on Product {
              handle
              featuredImage {
                url
              }
            }
          }
        }
      }
    }
  }
`);
