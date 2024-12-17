"use server";

import { getClient, flattenConnection } from "@whiteeespace/core/utils";

import { GetCollectionQuery, GetCollectionQueryVariables } from "@/gql/graphql";
import { GET_COLLECTION } from "@utils/queries/get-collection";

export const getCollection = async () => {
  const client = getClient();
  const results = await client.query<GetCollectionQuery, GetCollectionQueryVariables>(GET_COLLECTION, {
    collectionHandle: "club-exclusive",
  });

  const products = flattenConnection(results.data?.collection?.products);
  return { products };
};
