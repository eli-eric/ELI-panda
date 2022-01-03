import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

export const navigationConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/bottom-navigation",
    component: React.lazy(() => import("./BottomNavigation")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/breadcrumbs",
    component: React.lazy(() => import("./Breadcrumbs")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/drawers",
    component: React.lazy(() => import("./Drawer")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/links",
    component: React.lazy(() => import("./Links")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/menus",
    component: React.lazy(() => import("./Menu")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/pagination",
    component: React.lazy(() => import("./Pagination")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/speed-dial",
    component: React.lazy(() => import("./SpeedDial")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/steppers",
    component: React.lazy(() => import("./Stepper")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/navigation/tabs",
    component: React.lazy(() => import("./Tabs")),
  },
];
