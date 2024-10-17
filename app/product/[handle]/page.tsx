import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { Product, WithContext } from "schema-dts";

import { ProductProvider } from "./_components/ProductProvider";
import { ProductView, SizeChartData } from "./_components/ProductView";
import { getProduct } from "./action";

export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const handle = String(params.handle);
  const { product, productImages } = await getProduct(handle);

  if (!product) {
    return {};
  }

  // optionally access and extend (rather than replace) parent metadata
  const images = productImages.map((image) => image.url);
  const parentFields = await parent;

  return {
    title: `Sageism · ${product.title}`,
    description: product.description,
    openGraph: {
      images,
    },
    metadataBase: parentFields.metadataBase,
    ...parentFields.robots,
  };
}

const ProductPage = async ({ params }) => {
  const handle = String(params.handle);

  if (!handle) {
    return redirect("/shop");
  }

  const {
    product,
    productImages,
    productVariants,
    maleModelImages,
    femaleModelImages,
    modelInfo,
    sizeChart,
  } = await getProduct(handle);

  if (!product) {
    return <></>;
  }

  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.edges.map((image) => image.node.url),
    description: product.description,
    productID: product.id,
    manufacturer: "Sageism",
    category: "Clothing",
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 13.0,
    },
    offers: {
      "@type": "Offer",
      price: product.priceRange.minVariantPrice.amount,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      availability: "https://schema.org/InStock",
      availableDeliveryMethod: "https://schema.org/ParcelService",
    },
  };

  const sizeChartData: SizeChartData[] = sizeChart ? JSON.parse(sizeChart.value) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductProvider data={product}>
        <ProductView
          productImages={productImages}
          productVariants={productVariants}
          maleModelImages={maleModelImages}
          femaleModelImages={femaleModelImages}
          modelInfo={modelInfo}
          sizeChartData={sizeChartData}
        />
      </ProductProvider>
    </>
  );
};

export default ProductPage;
