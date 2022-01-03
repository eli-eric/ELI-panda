import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

export const dataDisplayConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/avatars",
    component: React.lazy(() => import("./Avatar")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/badges",
    component: React.lazy(() => import("./Badges")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/chips",
    component: React.lazy(() => import("./Chips")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/divider",
    component: React.lazy(() => import("./Divider")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/lists",
    component: React.lazy(() => import("./Lists")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/tables",
    component: React.lazy(() => import("./Table")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/tooltip",
    component: React.lazy(() => import("./Tooltip")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/data-display/divider",
    component: React.lazy(() => import("./Divider")),
  },
];
