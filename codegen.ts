import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "node_modules/@shopify/hydrogen-react/storefront.schema.json",
  documents: ["src/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};

export default config;
