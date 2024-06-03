export const session = (signed: boolean) => {
  return signed
    ? {
        session: {
          user: {
            email: 'test.one@eli-laser.eu',
            roles: [
              'systems-edit',
              'catalogue-edit',
              'catalogue-view',
              'systems-view',
              'catalogue-category-edit',
              'basics'
            ],
            apiAccessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJzeXN0ZW1zLWVkaXQiLCJjYXRhbG9ndWUtZWRpdCIsImNhdGFsb2d1ZS12aWV3Iiwic3lzdGVtcy12aWV3IiwiY2F0YWxvZ3VlLWNhdGVnb3J5LWVkaXQiLCJiYXNpY3MiXSwiZmFjaWxpdHlOYW1lIjoiRUxJIC0gQmVhbWxpbmVzIiwiZmFjaWxpdHlDb2RlIjoiQiIsImV4cCI6NDgzMjMzOTIxNSwic3ViIjoiZjNiNDNhZTQtOGRhMS00MDQ4LWI4ZGItYTlkOWU5ZTFhMzAwIn0.7_TEYz5fDSB_PCGbI0hUt93dlLNevP7D4oIYk713aQY',
            facility: 'ELI - Beamlines',
            fullName: 'Albert Einstein'
          },
          expires: '2023-04-12T20:26:55.898Z'
        }
      }
    : { session: {} }
}

export const providers = {
  credentials: {
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    signinUrl: `${Cypress.env('host')}/api/auth/signin/credentials`,
    callbackUrl: `${Cypress.env('host')}/api/auth/callback/credentials`
  }
}

export const csrfToken = {
  csrfToken: '56a9ca59c16a3038fd49bdcad0cdd79f18c26b196e21a81e6d719f09958fbb33'
}

export const credentials = { url: Cypress.env('host') }
