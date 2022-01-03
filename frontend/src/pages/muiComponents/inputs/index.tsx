import React from "react";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

export const inputsConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/autocomplete",
    component: React.lazy(() => import("./AutoComplete")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/buttons",
    component: React.lazy(() => import("./Buttons")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/button-group",
    component: React.lazy(() => import("./ButtonGroup")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/checkboxes",
    component: React.lazy(() => import("./Checkboxes")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/floating-action-button",
    component: React.lazy(() => import("./FloatingActionButton")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/radios",
    component: React.lazy(() => import("./Radio")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/rating",
    component: React.lazy(() => import("./Rating")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/selects",
    component: React.lazy(() => import("./Selects")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/slider",
    component: React.lazy(() => import("./Slider")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/switches",
    component: React.lazy(() => import("./Switches")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/text-fields",
    component: React.lazy(() => import("./TextField")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/transfer-list",
    component: React.lazy(() => import("./TransferList")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/mui/inputs/toggle-buttons",
    component: React.lazy(() => import("./ToggleButtons")),
  },
];
