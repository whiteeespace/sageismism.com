import { Metadata, ResolvingMetadata } from "next";
import React from "react";

import History from "./_components/History";
import styles from "./styles.module.scss";

export async function generateMetadata(_, parent: ResolvingMetadata): Promise<Metadata> {
  const parentFields = await parent;

  return {
    title: "Sageism · about us",
    description: "About Sageism and our journey.",
    metadataBase: parentFields.metadataBase,
    ...parentFields.robots,
  };
}

const AboutUsPage: React.FC = () => {
  return (
    <>
      <div className={styles["text-container"]}>
        <p>Sageism, established in 2020, based in Montreal.</p>
      </div>
      <History />
    </>
  );
};

export default AboutUsPage;
