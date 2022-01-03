import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

export const utilConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/click-away-listener",
    component: React.lazy(() => import("./ClickawayListener")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/modal/",
    component: React.lazy(() => import("./Modal")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/NoSSR1/",
    component: React.lazy(() => import("./NoSSR1")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/Popover/",
    component: React.lazy(() => import("./Popover")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/Popper/",
    component: React.lazy(() => import("./Popper")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/Portal/",
    component: React.lazy(() => import("./Portal")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/Transitions/",
    component: React.lazy(() => import("./Transitions")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/utility/MediaQuery/",
    component: React.lazy(() => import("./MediaQuery")),
  },
];
