import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

export const layoutConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/layout/box",
    component: React.lazy(() => import("./Box")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/layout/container",
    component: React.lazy(() => import("./Container")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/layout/Grid",
    component: React.lazy(() => import("./Grid")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/layout/Stack",
    component: React.lazy(() => import("./Stack")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/layout/Image-list",
    component: React.lazy(() => import("./ImageList")),
  },
];
