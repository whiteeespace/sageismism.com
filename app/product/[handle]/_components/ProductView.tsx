"use client";

import {
  Image,
  Model3D,
  AddToCartButton,
  useProduct,
  ProductPrice,
  useShopifyAnalytics,
  useCart,
} from "@whiteeespace/core";
import { Fragment } from "react";

import Button from "@/components/shared/Button";
import { Image as ImageType, ProductVariant } from "@/gql/graphql";
import { SizeRadio, SizeRadioGroup } from "@components/Sizes";
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
  const { id: cartId } = useCart();
  const { sendAddToCart } = useShopifyAnalytics({
    shopId: `${process.env.NEXT_PUBLIC_SHOP_ID}`,
    currency: "CAD",
  });

  if (!product) {
    return <></>;
  }

  const featuredImage = product.featuredImage;

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
        {!!maleModelImages.length && !!femaleModelImages.length ? (
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
            <div className={styles["carousel-text"]}>drag models for 360° view</div>
          </div>
        ) : (
          <Image
            src={featuredImage?.url}
            alt={featuredImage?.altText ?? "product image"}
            className={styles["product-image"]}
          />
        )}
      </div>
      <div className={styles["right-content"]}>
        <ProductPrice data={product} withoutTrailingZeros={true} className={styles["price"]} />

        <SizeRadioGroup
          aria-label={"sizes"}
          defaultValue={product.availableForSale ? selectedVariant?.id : undefined}
          onValueChange={(id: string) => {
            const variant = productVariants.find((variant) => variant?.id === id);
            if (variant) {
              setSelectedVariant(variant);
            }
          }}
        >
          {productVariants.map((variant) => (
            <SizeRadio key={variant?.id} value={variant?.id ?? ""} disabled={!variant?.availableForSale}>
              {variant?.title}
            </SizeRadio>
          ))}
        </SizeRadioGroup>

        <AddToCartButton // @ts-expect-error typing issues with shopify
          as={Button}
          className={styles["button"]}
          variantId={selectedVariant?.id}
          disabled={!product.availableForSale}
          onClick={() => {
            sendAddToCart({
              cartId: cartId ?? "",
              products: [
                {
                  productGid: product.id ?? "",
                  name: product.title ?? "",
                  brand: product.vendor ?? "Sageism",
                  price: product.priceRange?.maxVariantPrice?.amount ?? "0",
                  variantGid: selectedVariant?.id ?? "",
                  quantity: 1,
                },
              ],
            });
          }}
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
