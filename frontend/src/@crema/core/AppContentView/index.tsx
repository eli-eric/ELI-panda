import React from "react";
import { Route, Switch } from "react-router-dom";
import { AppSuspense } from "../../index";
import { anonymousStructure, authorizedStructure, unAuthorizedStructure } from "../../../pages";
import AppFooter from "../AppLayout/components/AppFooter";
import AppErrorBoundary from "../AppErrorBoundary";
import generateRoutes from "../../utility/RouteGenerator";
import { useAuthUser } from "../../utility/AuthHooks";
import Error404 from "../../../pages/errorPages/Error404";
import Box from "@mui/material/Box";
import AppContentViewWrapper from "./AppContentViewWrapper";
import { SxProps } from "@mui/system";

interface AppContentViewProps {
  sxStyle?: SxProps;
}

const AppContentView: React.FC<AppContentViewProps> = ({ sxStyle }) => {
  const { user, isAuthenticated } = useAuthUser();

  return (
    <AppContentViewWrapper>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          p: { xs: 0, md: 0, xl: 0 },
          ...sxStyle,
        }}
        className="app-content"
      >
        <AppSuspense>
          <AppErrorBoundary>
            <Switch>
              {generateRoutes({
                isAuthenticated: isAuthenticated,
                userRole: user?.role,
                unAuthorizedStructure,
                authorizedStructure,
                anonymousStructure,
              })}
              <Route path="/">
                <Error404 />
              </Route>
            </Switch>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </AppContentViewWrapper>
  );
};

export default AppContentView;
