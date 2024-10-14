import { redirect } from "next/navigation";

import { ProductProvider } from "./_components/ProductProvider";
import { ProductView } from "./_components/ProductView";
import { getProduct } from "./action";

const ProductPage = async ({ params }) => {
  const handle = String(params.handle);

  if (!handle) {
    return redirect("/shop");
  }

  const { product, productImages, productVariants, maleModelImages, femaleModelImages, modelInfo } =
    await getProduct(handle);

  if (!product) {
    return <></>;
  }

  return (
    <ProductProvider data={product}>
      <ProductView
        productImages={productImages}
        productVariants={productVariants}
        maleModelImages={maleModelImages}
        femaleModelImages={femaleModelImages}
        modelInfo={modelInfo}
      />
    </ProductProvider>
  );
};

export default ProductPage;
