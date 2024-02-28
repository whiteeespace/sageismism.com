import { useQuery } from "@apollo/client";
import { ProductPrice, flattenConnection } from "@shopify/hydrogen-react";
import { GetProductQuery, GetProductQueryVariables, ProductVariant } from "gql/graphql";
import { GET_PRODUCT } from "queries/get-product";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "shared-components/core/Button";
import { ProductSizes, Size } from "shared-components/core/Sizes";
import { Gender } from "utils/types/gender";
import { Image, Model3D, useWindowView, AddToCartButton, ProductProvider, useProduct } from "whiteeespace";

import DetailsDialog from "./DetailsDialog";
import styles from "./ProductPage.module.scss";

interface Props {
  productQuery: GetProductQuery;
}

interface ModelInfo {
  "male-model": { height: string; size: string };
  "female-model": { height: string; size: string };
  text: string;
}

const ProductView: React.FC<Props> = ({ productQuery }) => {
  const { selectedVariant, setSelectedVariant } = useProduct();
  const { isTabletOrMobile } = useWindowView();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);

  const product = productQuery.product;
  if (!product) {
    return <></>;
  }

  const productImages = flattenConnection(product.images);

  const productVariants: ProductVariant[] = flattenConnection(product.variants).filter(
    (variant): variant is ProductVariant => !!variant
  );

  const maleModelImages: string[] = product.maleModel?.references
    ? flattenConnection(product.maleModel.references).map(
        (reference) => reference.__typename === "MediaImage" && reference.image?.url
      )
    : [];

  const femaleModelImages: string[] = product.femaleModel?.references
    ? flattenConnection(product.femaleModel.references).map(
        (reference) => reference.__typename === "MediaImage" && reference.image?.url
      )
    : [];

  const modelInfo: ModelInfo = product.modelInfo ? JSON.parse(product.modelInfo.value) : null;

  const onClickImage = (i: number) => {
    setPrimaryImageIndex(i);
    setIsDetailsOpen(true);
  };

  const ProductDetails = () => (
    <div className={styles["left-content"]}>
      <h1>{product.title}</h1>
      <div
        className={styles["description"]}
        dangerouslySetInnerHTML={{
          __html: product.descriptionHtml,
        }}
      />
      <div className={styles["product-details-images"]}>
        {productImages.map((image, i) => (
          <Button variant={"secondary"} onClick={() => onClickImage(i)} key={`productImage${i}`}>
            <Image src={image.url} />
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["main-content"]}>
          {!isTabletOrMobile && <ProductDetails />}
          {maleModelImages.length && femaleModelImages.length ? (
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
          ) : (
            <div className={styles["primary-image"]}>
              <Image src={productImages[0].url} />
            </div>
          )}

          {isTabletOrMobile && <ProductDetails />}
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
        </div>
      </div>
      <DetailsDialog
        images={productImages.map((image) => image.url)}
        openAt={primaryImageIndex}
        isOpen={isDetailsOpen}
        setIsOpen={setIsDetailsOpen}
      />
    </>
  );
};

const ProductPage = () => {
  const { handle } = useParams();

  const { data: productData } = useQuery<GetProductQuery, GetProductQueryVariables>(GET_PRODUCT, {
    variables: { handle: handle! },
  });

  if (!productData?.product) {
    return <></>;
  }

  return (
    <ProductProvider data={productData.product}>
      <ProductView productQuery={productData} />
    </ProductProvider>
  );
};

export default ProductPage;
