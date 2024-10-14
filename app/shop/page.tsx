import classNames from "classnames";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

import Item from "@/components/shared/Item";
import { ProductLabel } from "@utils/types/productLabel";

import { getCollection } from "./action";
import styles from "./styles.module.scss";

export async function generateMetadata(_, parent: ResolvingMetadata): Promise<Metadata> {
  const parentFields = await parent;

  return {
    title: "Sageism · shop",
    description: "shop sageism jawns namsayin. shipping worldwide.",
    metadataBase: parentFields.metadataBase,
    ...parentFields.robots,
  };
}

const ShopPage = async () => {
  const { products } = await getCollection();

  return (
    <section className={classNames(styles["container"])}>
      <div className={classNames(styles["products"])}>
        {products?.map((product) => {
          const labelInfo = product.label?.value
            ? (JSON.parse(product.label.value) as ProductLabel)
            : undefined;
          return (
            <Link href={`/product/${product.handle}`} key={product.handle}>
              <Item
                src={
                  product.image?.reference?.__typename === "MediaImage" && product.image?.reference.image?.url
                }
                name={product.title}
                productLabel={labelInfo}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ShopPage;
