import React from "react";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { ConnectedRouter } from "connected-react-router";
import AuthRoutes from "@crema/utility/AuthRoutes";
import AppContextProvider from "@crema/utility/AppContextProvider";
import AppThemeProvider from "@crema/utility/AppThemeProvider";
import AppStyleProvider from "@crema/utility/AppStyleProvider";
import AppLocaleProvider from "@crema/utility/AppLocaleProvider";
import AppLayout from "@crema/core/AppLayout";
import configureStore, { history } from "redux/store";

import JWTAuthAuthProvider from "./@crema/services/auth/jwt-auth/JWTAuthProvider";

import { LicenseInfo } from "@mui/x-data-grid-pro";

LicenseInfo.setLicenseKey("aec8ce9b5820bdc372655e81b0c242d0T1JERVI6MzcxODIsRVhQSVJZPTE2NzU1OTI0MTEwMDAsS0VZVkVSU0lPTj0x");

const store = configureStore();

const App = () => (
  <AppContextProvider>
    <Provider store={store}>
      <AppThemeProvider>
        <AppStyleProvider>
          <AppLocaleProvider>
            <ConnectedRouter history={history}>
              <JWTAuthAuthProvider>
                <AuthRoutes>
                  <CssBaseline />
                  <AppLayout />
                </AuthRoutes>
              </JWTAuthAuthProvider>
            </ConnectedRouter>
          </AppLocaleProvider>
        </AppStyleProvider>
      </AppThemeProvider>
    </Provider>
  </AppContextProvider>
);

export default App;
