export const custonSession = (signed: boolean) => {
  return signed
    ? {
        session: {
          user: {
            email: 'albert.einstein@eli-laser.eu',
            roles: ['basics', 'catalogue-view', 'systems-view', 'reports-view'],
            apiAccessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOiIxMjM0NTY3ODk5In0.4UuocEvJTR3c1t2kB4f5lbRKfs5yKe7dW1Qtm_LITII',
            facility: 'ELI ERIC',
            fullName: 'Albert Einstein'
          },
          expires: '2022-12-21T14:01:50.309Z'
        }
      }
    : { session: {} }
}

export const session = {}

export const providers = {
  credentials: {
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    signinUrl: `${Cypress.env('host')}/api/auth/signin/credentials`,
    callbackUrl: `${Cypress.env('host')}/api/auth/callback/credentials`
  }
}

export const csrfToken = { csrfToken: '56a9ca59c16a3038fd49bdcad0cdd79f18c26b196e21a81e6d719f09958fbb33' }

export const credentials = { url: Cypress.env('host') }
