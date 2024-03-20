import {
  CollectionMetaobject,
  ReferencesMetaobject,
  flattenConnection,
  getClient,
  parseMetaobject,
  validateEnvironmentVariables,
} from "@whiteeespace/core";
import { MetadataRoute } from "next";

import { GetCollectionQuery, GetCollectionQueryVariables, GetLookbookListQuery } from "@/gql/graphql";
import { baseUrl } from "@utils/base-url";
import { GET_COLLECTION } from "@utils/queries/get-collection";
import { GET_LOOKBOOK_LIST } from "@utils/queries/get-lookbook-list";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap = ["", "/shop", "/lookbooks", "/stockists", "/contact", "/policies"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const client = getClient(
    process.env.REACT_APP_STOREFRONT_DOMAIN!,
    process.env.REACT_APP_PUBLIC_STOREFRONT_API_TOKEN!
  );

  const getProductRoutes = async () => {
    const productsData = await client.query<GetCollectionQuery, GetCollectionQueryVariables>({
      query: GET_COLLECTION,
      variables: { collectionHandle: "all-products" },
    });

    const products = flattenConnection(productsData.data.collection?.products);
    return products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: (product.updatedAt as string) ?? new Date().toISOString(),
    }));
  };

  const getLookbookRoutes = async () => {
    const lookbooksData = await client.query<GetLookbookListQuery>({
      query: GET_LOOKBOOK_LIST,
    });

    const lookbooks = parseMetaobject<ReferencesMetaobject<CollectionMetaobject>>(
      lookbooksData.data.metaobject?.lookbooks
    );
    return (
      lookbooks.references?.map((lookbook) => ({
        url: `${baseUrl}/lookbook/${lookbook.collection?.handle}`,
        lastModified: lookbook.collection?.updatedAt ?? new Date().toISOString(),
      })) ?? []
    );
  };

  const productRoutes = await getProductRoutes();
  const lookbookRoutes = await getLookbookRoutes();

  return [...routesMap, ...productRoutes, ...lookbookRoutes];
}
