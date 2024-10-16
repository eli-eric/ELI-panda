import { encode } from 'next-auth/jwt'
import type { JWT } from 'next-auth/jwt'

Cypress.Commands.add(
  'loginNextAuth',
  ({
    apiAccessToken,
    email,
    facility,
    facilityCode,
    fullName,
    roles,
    uid
  }: loginNextAuthParams) => {
    Cypress.log({
      displayName: 'NEXT-AUTH LOGIN',
      message: [`🔐 Authenticating | ${fullName}`]
    })

    const dateTimeNow = Math.floor(Date.now() / 1000)
    const expiry = dateTimeNow + 30 * 24 * 60 * 60 // 30 days
    const cookieName = 'next-auth.session-token'
    const cookieValue: JWT = {
      apiAccessToken: apiAccessToken,
      email: email,
      facility: facility,
      facilityCode: facilityCode,
      fullName: fullName,
      roles: roles,
      sub: uid,
      jti: crypto.randomUUID(),
      exp: expiry
    }

    cy.wrap(null, { log: false }).then(() => {
      return new Cypress.Promise(async (resolve, reject) => {
        try {
          const encryptedCookieValue = await encode({
            token: cookieValue,
            secret: Cypress.env('nextauth_secret')
          })

          cy.setCookie(cookieName, encryptedCookieValue, {
            log: false,
            httpOnly: true,
            path: '/',
            expiry: expiry
          })

          resolve()
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err)
          reject()
        }
      })
    })
  }
)
