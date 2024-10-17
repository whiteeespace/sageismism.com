"use server";

import { flattenConnection, getClient } from "@whiteeespace/core/utils";

import { GetProductQuery, GetProductQueryVariables, ProductVariant } from "@/gql/graphql";
import { GET_PRODUCT } from "@utils/queries/get-product";

interface ModelInfo {
  "male-model": { height: string; size: string };
  "female-model": { height: string; size: string };
  text: string;
}

export const getProduct = async (handle: string) => {
  const client = getClient();

  const result = await client.query<GetProductQuery, GetProductQueryVariables>(GET_PRODUCT, {
    handle,
  });

  const productImages = flattenConnection(result.data?.product?.images);

  const productVariants: ProductVariant[] = flattenConnection(result.data?.product?.variants).filter(
    (variant): variant is ProductVariant => !!variant
  );

  const maleModelImages: string[] = result.data?.product?.maleModel?.references
    ? flattenConnection(result.data?.product?.maleModel.references).map(
        (reference) => reference.__typename === "MediaImage" && reference.image?.url
      )
    : [];

  const femaleModelImages: string[] = result.data?.product?.femaleModel?.references
    ? flattenConnection(result.data?.product?.femaleModel.references).map(
        (reference) => reference.__typename === "MediaImage" && reference.image?.url
      )
    : [];

  const modelInfo: ModelInfo = result.data?.product?.modelInfo
    ? JSON.parse(result.data?.product?.modelInfo.value)
    : null;

  return {
    product: result.data?.product,
    productImages,
    productVariants,
    maleModelImages,
    femaleModelImages,
    modelInfo,
    sizeChart: result.data?.product?.sizeChart,
  };
};
