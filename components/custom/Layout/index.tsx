"use client";

import { UrqlProvider, WhiteeeShopifyProvider } from "@whiteeespace/core";
import classNames from "classnames";
import { PropsWithChildren } from "react";

import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";

import styles from "./styles.module.scss";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <UrqlProvider>
      <WhiteeeShopifyProvider countryCode="CA" languageCode="EN">
        <div className={classNames(styles["container"])}>
          <Navbar />
          <div className={classNames(styles["content"])}>{children}</div>
          <Footer />
        </div>
      </WhiteeeShopifyProvider>
    </UrqlProvider>
  );
};
export default Layout;
