"use client";

import { ShopifyAnalytics, UrqlProvider, WhiteeeShopifyProvider } from "@whiteeespace/core";
import { usePathname } from "next/navigation";
import React from "react";

import FacebookPixel from "../MetaPixel";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <UrqlProvider>
      <WhiteeeShopifyProvider countryCode="CA" languageCode="EN">
        {children}
        <ShopifyAnalytics
          shopId={`${process.env.NEXT_PUBLIC_SHOP_ID}`}
          currency={"CAD"}
          pathname={pathname}
          domain={"sageismism.com"}
        />
        <FacebookPixel />
      </WhiteeeShopifyProvider>
    </UrqlProvider>
  );
};

export default Wrapper;
