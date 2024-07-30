import {
  CollectionMetaobject,
  ReferencesMetaobject,
  flattenConnection,
  parseMetaobject,
  serverSideFetch,
  validateEnvironmentVariables,
} from "@whiteeespace/core/utils";
import { MetadataRoute } from "next";

import { ShopifyCollectionOperation, getCollectionQuery } from "@/lib/queries/get-collection";
import { ShopifyLookbooksOperation, getLookbooksQuery } from "@/lib/queries/get-lookbook-list";
import { baseUrl } from "@utils/base-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap = ["", "/shop", "/lookbooks", "/stockists", "/contact", "/policies"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const collection = await serverSideFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    variables: {
      collectionHandle: "all-products",
    },
  });

  const products =
    collection.body.data.collection && flattenConnection(collection.body.data.collection.products);
  const productRoutes =
    products?.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: (product.updatedAt as string) ?? new Date().toISOString(),
    })) ?? [];

  const lookbooksData = await serverSideFetch<ShopifyLookbooksOperation>({
    query: getLookbooksQuery,
  });

  const lookbooks = parseMetaobject<ReferencesMetaobject<CollectionMetaobject>>(
    lookbooksData.body.data.metaobject?.lookbooks
  );
  const lookbookRoutes =
    lookbooks.references?.map((lookbook) => ({
      url: `${baseUrl}/lookbook/${lookbook.collection?.handle}`,
      lastModified: lookbook.collection?.updatedAt ?? new Date().toISOString(),
    })) ?? [];

  return [...routesMap, ...productRoutes, ...lookbookRoutes];
}
