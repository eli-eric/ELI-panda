import { custonSession } from './mock/auth'
export const API_MAPPING = {
  providers: [
    'GET',
    Cypress.env('host') + '/api/auth/providers',
    {
      credentials: {
        id: 'credentials',
        name: 'Credentials',
        type: 'credentials',
        signinUrl: `${Cypress.env('host')}/api/auth/signin/credentials`,
        callbackUrl: `${Cypress.env('host')}/api/auth/callback/credentials`
      }
    }
  ],
  csrf: [
    'GET',
    Cypress.env('host') + '/api/auth/csrf',
    { csrfToken: '56a9ca59c16a3038fd49bdcad0cdd79f18c26b196e21a81e6d719f09958fbb33' }
  ],
  credentials: [
    'POST',
    Cypress.env('host') + '/api/auth/callback/credentials?',
    { url: Cypress.env('host') }
  ],
  session: ['GET', Cypress.env('host') + '/api/auth/session', {}]
}

export const SCRENARIOS = {
  signIn: { custonSession }
}

export const setApiMocks = (scenario?: Object) => {
  const setRoute = responseSet => key => {
    const [method, route] = API_MAPPING[key]
    cy.intercept(method, route, responseSet[key]).as(key)
  }
  Object.keys(API_MAPPING).forEach(
    setRoute(
      Object.keys(API_MAPPING).reduce((prev, cur) => ({ ...prev, [cur]: API_MAPPING[cur][2] }), {})
    )
  )
  if (scenario) Object.keys(scenario).forEach(setRoute(scenario))
}

export function setupServerForTest(): void {
  cy.server({
    force404: true,
    ignore: xhr =>
      xhr.method === 'GET' &&
      /\.(jsx?|html|css|json)(\?.*)?$/.test(xhr.url) &&
      !/all_[a-z]{2}\.json$/.test(xhr.url)
  })
}

export function prepareGenericDataForTest(): void {
  cy.on('uncaught:exception', err => {
    if (err.message.includes('ResizeObserver loop limit exceeded')) return false
  })
  cy.viewport('macbook-15')
  setupServerForTest()
}
