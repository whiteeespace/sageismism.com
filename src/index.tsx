import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import Root from "Root";
import PageLoader from "shared-components/custom/PageLoader";

import "./global.scss";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<PageLoader />}>
      <Root />
    </Suspense>
  </React.StrictMode>
);
