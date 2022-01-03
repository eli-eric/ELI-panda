import React from "react";

export const authRouteConfig = [
  {
    path: "/signin",
    component: React.lazy(() => import("./Signin/index")),
  },
  {
    path: "/signup",
    component: React.lazy(() => import("./Signup/index")),
  },
  {
    path: "/forget-password",
    component: React.lazy(() => import("./ForgetPassword")),
  },
  {
    path: "/confirm-signup",
    component: React.lazy(() => import("./ConfirmSignupAwsCognito")),
  },
  {
    path: "/reset-password",
    component: React.lazy(() => import("./ResetPasswordAwsCognito")),
  },
];
