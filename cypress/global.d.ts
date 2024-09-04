/* eslint-disable @typescript-eslint/no-explicit-any */
interface loginNextAuthParams {
  sub: string
  uid: string
  jti: string
  fullName: string
  name: string
  email: string
  fullName: string
  facility: string
  facilityCode: string
  roles: Array<Role>
  apiAccessToken: string
}

declare namespace Cypress {
  // noinspection JSUnusedGlobalSymbols
  interface Chainable {
    /**
     * Logs in via the next-auth session cookie for the JWT strategy ONLY!
     */
    loginNextAuth(params: loginNextAuthParams): Chainable<any>
  }
}
