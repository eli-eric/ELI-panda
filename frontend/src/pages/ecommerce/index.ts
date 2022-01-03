import React from "react";
import { RoutePermittedRole } from "../../shared/constants/AppConst";

export const ecommerceConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/ecommerce/invoice-1",
    component: React.lazy(() => import("./Invoice1")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/ecommerce/invoice-2",
    component: React.lazy(() => import("./Invoice2")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/ecommerce/invoice-3",
    component: React.lazy(() => import("./Invoice3")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/ecommerce/products",
    component: React.lazy(() => import("./Products")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/ecommerce/product_detail/:id?",
    component: React.lazy(() => import("./ProductDetail")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/ecommerce/customers",
    component: React.lazy(() => import("./Customers")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/ecommerce/checkout",
    component: React.lazy(() => import("./Checkout")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/ecommerce/cart",
    component: React.lazy(() => import("./Carts")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/ecommerce/orders",
    component: React.lazy(() => import("./Orders")),
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/ecommerce/confirmation",
    component: React.lazy(() => import("./Confirmation")),
  },
];
