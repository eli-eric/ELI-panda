import React from "react";
import { RoutePermittedRole } from "shared/constants/AppConst";

export const extraPagesConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/my-account",
    component: React.lazy(() => import("./Account")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/extra-pages/about-us",
    component: React.lazy(() => import("./AboutUs")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/extra-pages/knowledge-base",
    component: React.lazy(() => import("./KnowledgeBase")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/extra-pages/portfolio",
    component: React.lazy(() => import("./Portfolio")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/extra-pages/faq",
    component: React.lazy(() => import("./FAQ")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/extra-pages/contact-us",
    component: React.lazy(() => import("./ContactUs")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/extra-pages/pricing",
    component: React.lazy(() => import("./Pricing")),
  },
];
