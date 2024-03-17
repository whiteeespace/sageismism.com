import { WhiteeeShopifyProvider } from "@whiteeespace/core";
import { RouterProvider } from "react-router-dom";
import { router } from "RootRouter";

const Root = () => (
  <WhiteeeShopifyProvider
    storeDomain={process.env.REACT_APP_STOREFRONT_DOMAIN!}
    storeToken={process.env.REACT_APP_PUBLIC_STOREFRONT_API_TOKEN!}
    countryCode="CA"
    languageCode="EN"
  >
    <RouterProvider router={router} />
  </WhiteeeShopifyProvider>
);

export default Root;
