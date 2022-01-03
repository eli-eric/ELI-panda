import React from "react";
import { RoutePermittedRole } from "shared/constants/AppConst";

export const dashBoardConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/academy",
    component: React.lazy(() => import("./Academy")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/analytics",
    component: React.lazy(() => import("./Analytics")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/e-commerce",
    component: React.lazy(() => import("./ECommerce")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/crm",
    component: React.lazy(() => import("./CRM")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/health-care",
    component: React.lazy(() => import("./HealthCare")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/crypto",
    component: React.lazy(() => import("./Crypto")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/metrics",
    component: React.lazy(() => import("./Metrics")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/dashboards/widgets",
    component: React.lazy(() => import("./Widgets")),
  },
];
