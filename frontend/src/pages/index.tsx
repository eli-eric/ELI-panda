import { authRouteConfig } from "./auth";
import { initialUrl } from "shared/constants/AppConst";
import Error403 from "./errorPages/Error403";
import React from "react";
import { dashBoardConfigs } from "./dashboards";
import { errorPagesConfigs } from "./errorPages";
import { thirdPartyConfigs } from "./thirdParty";
import { extraPagesConfigs } from "./extraPages";
import { muiComponentConfigs } from "./muiComponents";
import { userPagesConfig } from "./userPages";
import { userListConfig } from "./userList";
import { appsConfig } from "./apps";
import { ecommerceConfig } from "./ecommerce";

const authorizedStructure = {
  fallbackPath: "/signin",
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...dashBoardConfigs,
    ...appsConfig,
    ...thirdPartyConfigs,
    ...extraPagesConfigs,
    ...ecommerceConfig,
    ...muiComponentConfigs,
    ...userPagesConfig,
    ...userListConfig,
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs,
};

export { authorizedStructure, unAuthorizedStructure, anonymousStructure };
