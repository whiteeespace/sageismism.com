import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
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
          <GoogleAnalytics gaId="G-F74KBNL4NN" />
          <FacebookPixel />
          <TikTokPixel />
        </body>
      </html>
    </>
  );
};

export default RootLayout;
