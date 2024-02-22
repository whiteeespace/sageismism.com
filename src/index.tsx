import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import Root from "Root";

import "./global.scss";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<>loading...</>}>
      <Root />
    </Suspense>
  </React.StrictMode>
);
