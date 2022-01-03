import React from 'react';
import {Redirect, Route} from 'react-router-dom';

// @ts-ignore
import _extends from '@babel/runtime/helpers/esm/extends';
import {authRole, RoutePermittedRole} from 'shared/constants/AppConst';

/**
 * @param {Object} structure - The passed object that defines the routes.
 * @param {boolean} structure.isAuthenticated - [Required] in order to differentiate between LoggedIn/Loggedout users
 * @param {string} structure.userRole - [Optional] in order to differentiate between admin and normal users
 * @param {object} [structure.anonymousStructure] - it's an object that has only [ routes ] array, [ these routes available for All personas ]
 * @param {object} [structure.authorizedStructure] - it's an object that has [ fallbackPath: {string}, routes: {array} ], fallbackPath: is used for redirect when a logged [in] user tried to access unAuthorized route, routes: only The Logged [in] Routes Available
 * @param {object} [structure.unAuthorizedStructure] - it's an object that has [ fallbackPath: {string}, routes: {array} ], fallbackPath: is used for redirect when a logged [out] user tried to access route that requires [Authorization] , routes: only The Logged [out] Routes Available
 * @param {component} [structure.component fallbackComponent] - in order to redirect in all cases if the route doesn't match.
 * @param {unAuthorizedComponent} [structure.unAuthorizedComponent] - in order to show not permitted route.
 * @returns {Array}
 */

const generateRoutes = (structure: any) => {
  const {
    isAuthenticated = false,
    anonymousStructure = {},
    authorizedStructure = {},
    unAuthorizedStructure = {},
    userRole = authRole.user,
  } = structure || {};

  const dynamicRoutes: any[] = [];

  if (structure?.anonymousStructure) {
    dynamicRoutes.push(
      ...routesGenerator(isAuthenticated, anonymousStructure, "anonymous")
    );
  }

  if (structure?.authorizedStructure) {
    dynamicRoutes.push(
      ...routesGenerator(
        isAuthenticated,
        authorizedStructure,
        "authorized",
        isAuthenticated ? userRole : null
      )
    );
  }

  if (structure?.unAuthorizedStructure) {
    dynamicRoutes.push(
      ...routesGenerator(isAuthenticated, unAuthorizedStructure, "unAuthorized")
    );
  }

  return dynamicRoutes;
};

/**
 * path: string
 * component: React.Component
 * routeProps: Object -----> To override route props
 * userRole: string -----> To override route props
 * redirectPath: String ----> To redirect to specific location
 * showRouteIf: to override when to show the component or when to [ Redirect ]
 */
const routesGenerator = (
  isAuthenticated: boolean = false,
  routeSet: any = {},
  type: string = "anonymous",
  userRole?: any
): any => {
  const generatedRoutes: any[] = [];
  const { fallbackPath = "" } = routeSet || {};

  const isAnonymous = type === "anonymous";
  const isAuthorized = type === "authorized";

  if (routeSet?.routes) {
    const setRoutes = routeSet.routes;
    if (Array.isArray(setRoutes) && setRoutes.length > 0) {
      setRoutes.forEach((route, index) => {
        const {
          path = "",
          component,
          permittedRole = RoutePermittedRole.User,
          routeProps = {},
          redirectPath = "",
          showRouteIf = true,
        } = route || {};
        // Show Route only [ in The list ] if this prop is true
        if (showRouteIf) {
          // check the mandatory props for a routes
          if (!path) {
            console.log(
              `A [route] is skipped because one of the following, No valid [path] prop provided for the route`
            );
          } else {
            if (isAnonymous) {
              return generatedRoutes.push(
                <Route
                  exact
                  key={`${path}_${index}`}
                  path={path}
                  render={(props) =>
                    React.createElement(
                      component,
                      _extends(
                        {},
                        props,
                        {},
                        {
                          route: route,
                        }
                      )
                    )
                  }
                  {...routeProps}
                />
              );
            }
            if (isAuthorized) {
              const renderCondition = isAuthorized
                ? isAuthenticated
                : !isAuthenticated;
              return generatedRoutes.push(
                <Route
                  exact
                  key={`${route.path}_${index}`}
                  path={route.path}
                  render={(props) => {
                    return renderCondition ? (
                      userRole.indexOf(permittedRole) > -1 ? (
                        React.createElement(
                          component,
                          _extends(
                            {},
                            props,
                            {},
                            {
                              route: route,
                            }
                          )
                        )
                      ) : (
                        routeSet.unAuthorizedComponent
                      )
                    ) : (
                      <Redirect to={redirectPath || fallbackPath} />
                    );
                  }}
                />
              );
            }
            const renderCondition = isAuthorized
              ? isAuthenticated
              : !isAuthenticated;
            return generatedRoutes.push(
              <Route
                exact
                key={`${route.path}_${index}`}
                path={route.path}
                render={(props) => {
                  return renderCondition ? (
                    React.createElement(
                      component,
                      _extends(
                        {},
                        props,
                        {},
                        {
                          route: route,
                        }
                      )
                    )
                  ) : (
                    <Redirect to={redirectPath || fallbackPath} />
                  );
                }}
              />
            );
          }
        }
      });
    }
  } else {
    console.log(`[routes] prop can't be found in ${type}Structure Object`);
  }
  return generatedRoutes;
};

export default generateRoutes;
