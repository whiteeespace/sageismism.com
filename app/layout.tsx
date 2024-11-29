import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import Script from "next/script";
import { PropsWithChildren } from "react";

import Layout from "@/components/custom/Layout";
import FacebookPixel from "@/components/custom/MetaPixel";
import TikTokPixel from "@/components/custom/TikTokPixel";
import { baseUrl } from "@/lib/base-url";

import "./global.scss";

export const metadata: Metadata = {
  title: "sageism",
  description: "sageism sageismism sageismismism ©.",
  metadataBase: new URL(baseUrl),
  robots: {
    follow: true,
    index: true,
  },
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Layout>{children}</Layout>
          <Script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/SN7QNR/klaviyo.js" />
          <GoogleAnalytics gaId="G-F74KBNL4NN" />
          <FacebookPixel />
          <TikTokPixel />
        </body>
      </html>
    </>
  );
};

export default RootLayout;
