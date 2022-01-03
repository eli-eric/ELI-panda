import React from "react";

export const thirdPartyConfigs = [
  // ...rechartsConfigs,
  {
    path: "/third-party/react-color",
    component: React.lazy(() => import("./reactColor")),
  },
  {
    path: "/third-party/google-map",
    component: React.lazy(() => import("./googleMap")),
  },
  // {
  //   path: "/third-party/react-notification",
  //   component: React.lazy(() => import("./reactNotification")),
  // },

  {
    path: "/third-party/react-dropzone",
    component: React.lazy(() => import("./reactDropzone")),
  },
  {
    path: "/third-party/react-player",
    component: React.lazy(() => import("./reactPlayer")),
  },
  {
    path: "/third-party/calendar",
    component: React.lazy(() => import("./calendar")),
  },
  {
    path: "/third-party/slider",
    component: React.lazy(() => import("./reactSlick")),
  },
];
