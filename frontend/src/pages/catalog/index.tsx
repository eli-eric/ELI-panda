import React from "react";

export const catalogPagesConfigs = [
  {
    path: "/catalog/catalog-list",
    component: React.lazy(() => import("./catalog-list")),
  },
  {
    path: "/catalog/catalog-category",
    component: React.lazy(() => import("./catalog-category")),
  },
];
