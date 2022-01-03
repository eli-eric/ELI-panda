import React from "react";
import { RoutePermittedRole } from "../../shared/constants/AppConst";

export const userPagesConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user/sign-in-1",
    component: React.lazy(() => import("./UserPages/Signin")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user/sign-in-2",
    component: React.lazy(() => import("./StyledUserPages/Signin")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user/sign-up-1",
    component: React.lazy(() => import("./UserPages/Signup")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user/sign-up-2",
    component: React.lazy(() => import("./StyledUserPages/Signup")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user/forgot-password-1",
    component: React.lazy(() => import("./UserPages/ForgetPassword")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user/forgot-password-2",
    component: React.lazy(() => import("./StyledUserPages/ForgetPassword")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user/reset-password-1",
    component: React.lazy(() => import("./UserPages/ResetPassword")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user/reset-password-2",
    component: React.lazy(() => import("./StyledUserPages/ResetPassword")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user/lock-1",
    component: React.lazy(() => import("./UserPages/UnlockScreen")),
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/user/lock-2",
    component: React.lazy(() => import("./StyledUserPages/UnlockScreen")),
  },
];
