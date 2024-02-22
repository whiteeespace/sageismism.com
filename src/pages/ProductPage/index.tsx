import { useQuery } from "@apollo/client";
import {
  AddToCartButton,
  BuyNowButton,
  Image,
  ProductPrice,
  ProductProvider,
  flattenConnection,
  useProduct,
} from "@shopify/hydrogen-react";
import { GetProductQuery, GetProductQueryVariables } from "gql/graphql";
import { GET_PRODUCT } from "queries/get-product";
import { useParams } from "react-router-dom";

const ProductView = () => {
  const { product, selectedVariant } = useProduct();
  if (!product) {
    return <></>;
  }

  const productImages = flattenConnection(product.images);
  return (
    <div>
      <p>{product.title}</p>
      <Image data={productImages[0]} />
      <p>{product.description}</p>
      <ProductPrice data={product} />
      <AddToCartButton variantId={selectedVariant?.id}>add to cart</AddToCartButton>
      {selectedVariant?.id && <BuyNowButton variantId={selectedVariant.id}>buy now</BuyNowButton>}
    </div>
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
      <ProductView />
    </ProductProvider>
  );
};

export default ProductPage;
