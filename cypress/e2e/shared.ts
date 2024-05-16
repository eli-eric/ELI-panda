import { credentials, csrfToken, providers, session } from './mock/auth'
import {
  catalogueCategories,
  catalogueItem,
  catalogueItems
} from './mock/catalogue'
export const API_MAPPING = {
  //authorization
  providers: ['GET', Cypress.env('host') + '/api/auth/providers', providers],
  csrf: ['GET', Cypress.env('host') + '/api/auth/csrf', csrfToken],
  credentials: [
    'POST',
    Cypress.env('host') + '/api/auth/callback/credentials?',
    credentials
  ],
  session: ['GET', Cypress.env('host') + '/api/auth/session', {}],
  //catalogue
  catalogueCategories: [
    'GET',
    '/api/mock-server/catalogue/categories*',
    catalogueCategories
  ],
  catalogueItems: ['GET', '/api/mock-server/catalogue/items*', {}],
  //catalogue item
  catalogueItem: ['GET', '/api/mock-server/catalogue/item/*', catalogueItem]
}

export const SCRENARIOS = {
  customSession: { session },
  customCatalogueItems: { catalogueItems }
}

export const setApiMocks = (scenario?: Object) => {
  const setRoute = responseSet => key => {
    const [method, route] = API_MAPPING[key]
    cy.intercept(method, route, responseSet[key]).as(key)
  }
  Object.keys(API_MAPPING).forEach(
    setRoute(
      Object.keys(API_MAPPING).reduce(
        (prev, cur) => ({ ...prev, [cur]: API_MAPPING[cur][2] }),
        {}
      )
    )
  )
  if (scenario) Object.keys(scenario).forEach(setRoute(scenario))
}
