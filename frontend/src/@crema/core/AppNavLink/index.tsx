import React from "react";
import { NavLink } from "react-router-dom";

const AppNavLink = React.forwardRef(
  (props: any, ref: React.Ref<HTMLAnchorElement>) => (
    <NavLink innerRef={ref} {...props} />
  )
);

export default AppNavLink;
