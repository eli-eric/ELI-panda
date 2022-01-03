import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

export const surfaceConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/surface/appbar",
    component: React.lazy(() => import("./AppBar")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/surface/accordion",
    component: React.lazy(() => import("./Accordion")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/surface/cards",
    component: React.lazy(() => import("./Card")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/surface/paper",
    component: React.lazy(() => import("./Paper")),
  },
];
