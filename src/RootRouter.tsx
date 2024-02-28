import { PropsWithChildren, Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import PageLoader from "shared-components/custom/PageLoader";

const MINIMUM_LOAD_TIME = 500;

const ShopLayout = lazy(async () => {
  return Promise.all([
    import("shared-components/layouts/ShopLayout"),
    new Promise((resolve) => setTimeout(resolve, MINIMUM_LOAD_TIME)),
  ]).then(([moduleExports]) => moduleExports);
});
const HomePage = lazy(async () => {
  return Promise.all([
    import("pages/HomePage"),
    new Promise((resolve) => setTimeout(resolve, MINIMUM_LOAD_TIME)),
  ]).then(([moduleExports]) => moduleExports);
});
const ShopPage = lazy(async () => {
  return Promise.all([
    import("pages/ShopPage"),
    new Promise((resolve) => setTimeout(resolve, MINIMUM_LOAD_TIME)),
  ]).then(([moduleExports]) => moduleExports);
});
const ProductPage = lazy(async () => {
  return Promise.all([
    import("pages/ProductPage"),
    new Promise((resolve) => setTimeout(resolve, MINIMUM_LOAD_TIME)),
  ]).then(([moduleExports]) => moduleExports);
});
const CartPage = lazy(async () => {
  return Promise.all([
    import("pages/CartPage"),
    new Promise((resolve) => setTimeout(resolve, MINIMUM_LOAD_TIME)),
  ]).then(([moduleExports]) => moduleExports);
});
const LookbooksPage = lazy(async () => {
  return Promise.all([
    import("pages/LookbooksPage"),
    new Promise((resolve) => setTimeout(resolve, MINIMUM_LOAD_TIME)),
  ]).then(([moduleExports]) => moduleExports);
});
const LookbookPage = lazy(async () => {
  return Promise.all([
    import("pages/LookbookPage"),
    new Promise((resolve) => setTimeout(resolve, MINIMUM_LOAD_TIME)),
  ]).then(([moduleExports]) => moduleExports);
});
const StockistsPage = lazy(async () => {
  return Promise.all([
    import("pages/StockistsPage"),
    new Promise((resolve) => setTimeout(resolve, MINIMUM_LOAD_TIME)),
  ]).then(([moduleExports]) => moduleExports);
});
const PoliciesPage = lazy(async () => {
  return Promise.all([
    import("pages/PoliciesPage"),
    new Promise((resolve) => setTimeout(resolve, MINIMUM_LOAD_TIME)),
  ]).then(([moduleExports]) => moduleExports);
});

const SuspensedElement: React.FC<PropsWithChildren> = ({ children }) => {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

export const router = createBrowserRouter([
  {
    element: <ShopLayout />,
    children: [
      {
        path: "/",
        element: (
          <SuspensedElement>
            <HomePage />
          </SuspensedElement>
        ),
      },
      {
        path: "/shop",
        element: (
          <SuspensedElement>
            <ShopPage />
          </SuspensedElement>
        ),
      },
      {
        path: "/product/:handle",
        element: (
          <SuspensedElement>
            <ProductPage />
          </SuspensedElement>
        ),
      },
      {
        path: "/cart",
        element: (
          <SuspensedElement>
            <CartPage />
          </SuspensedElement>
        ),
      },
      {
        path: "/lookbooks",
        element: (
          <SuspensedElement>
            <LookbooksPage />
          </SuspensedElement>
        ),
      },
      {
        path: "/lookbook/:handle",
        element: (
          <SuspensedElement>
            <LookbookPage />
          </SuspensedElement>
        ),
      },
      {
        path: "/stockists",
        element: (
          <SuspensedElement>
            <StockistsPage />
          </SuspensedElement>
        ),
      },
      {
        path: "/policies",
        element: (
          <SuspensedElement>
            <PoliciesPage />
          </SuspensedElement>
        ),
      },
    ],
  },
]);
