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
