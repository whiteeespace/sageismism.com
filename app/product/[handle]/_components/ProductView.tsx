"use client";

import { Image, Model3D, AddToCartButton, useProduct, ProductPrice } from "@whiteeespace/core";
import { Fragment } from "react";

import Button from "@/components/shared/Button";
import { ProductSizes, Size } from "@/components/shared/Sizes";
import { Image as ImageType, ProductVariant } from "@/gql/graphql";
import { Gender } from "@utils/types/gender";

import styles from "../styles.module.scss";

interface ModelInfo {
  "male-model": { height: string; size: string };
  "female-model": { height: string; size: string };
  text: string;
}

interface Props {
  productImages: Partial<ImageType>[];
  productVariants: ProductVariant[];
  maleModelImages: string[];
  femaleModelImages: string[];
  modelInfo: ModelInfo;
}

export const ProductView: React.FC<Props> = ({
  productImages,
  productVariants,
  maleModelImages,
  femaleModelImages,
  modelInfo,
}) => {
  const { product, selectedVariant, setSelectedVariant } = useProduct();

  if (!product) {
    return <></>;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["left-content"]}>
        <div className={styles["product-details"]}>
          <h1>{product?.title}</h1>
          <div
            className={styles["description"]}
            dangerouslySetInnerHTML={{
              __html: product?.descriptionHtml ?? "",
            }}
          />
        </div>
      </div>
      <div className={styles["main-content"]}>
        {maleModelImages.length && femaleModelImages.length && (
          <div className={styles["carousels-container"]}>
            <div className={styles["carousels"]}>
              <Model3D
                className={styles["carousel"]}
                images={maleModelImages}
                height={modelInfo?.["male-model"].height}
                size={modelInfo?.["male-model"].size}
                gender={Gender.MAN}
              />
              <Model3D
                className={styles["carousel"]}
                images={femaleModelImages}
                height={modelInfo?.["female-model"].height}
                size={modelInfo?.["female-model"].size}
                gender={Gender.WOMAN}
              />
            </div>
            <div className={styles["carousel-text"]}>drag for 360° view</div>
          </div>
        )}
      </div>
      <div className={styles["right-content"]}>
        <ProductPrice data={product} withoutTrailingZeros={true} className={styles["price"]} />

        <ProductSizes
          value={selectedVariant as ProductVariant | undefined}
          onChange={(val) => setSelectedVariant(val)}
        >
          {productVariants.map((variant) => (
            <Fragment key={variant.id}>
              <Size label={variant.title} value={variant} disabled={!variant.availableForSale} />
            </Fragment>
          ))}
        </ProductSizes>

        <AddToCartButton // @ts-expect-error typing issues with shopify
          as={Button}
          className={styles["button"]}
          variantId={selectedVariant?.id}
          disabled={!product.availableForSale}
        >
          {product.availableForSale ? "add to cart" : "sold out"}
        </AddToCartButton>
      </div>
      <div className={styles["product-images"]}>
        {productImages.slice(0, -1).map((image) => (
          <Image
            key={image.url}
            src={image.url}
            alt={image.altText ?? "product image"}
            className={styles["product-image"]}
          />
        ))}
      </div>
    </div>
  );
};
