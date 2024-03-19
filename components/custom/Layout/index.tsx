"use client";

import { WhiteeeShopifyProvider } from "@whiteeespace/core";
import classNames from "classnames";
import { PropsWithChildren } from "react";

import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";

import styles from "./styles.module.scss";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <WhiteeeShopifyProvider
      storeDomain={process.env.NEXT_PUBLIC_STOREFRONT_DOMAIN!}
      storeToken={process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN!}
      countryCode="CA"
      languageCode="EN"
    >
      <div className={classNames(styles["container"])}>
        <Navbar />
        <div className={classNames(styles["content"])}>{children}</div>
        <Footer />
      </div>
    </WhiteeeShopifyProvider>
  );
};
export default Layout;
