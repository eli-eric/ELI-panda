export const session = (signed: boolean) => {
  return signed
    ? {
        session: {
          user: {
            email: 'jan.test@gmail.com',
            roles: [
              'room-cards-view',
              'catalogue-view',
              'systems-view',
              'basics'
            ],
            apiAccessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJyb29tLWNhcmRzLXZpZXciLCJjYXRhbG9ndWUtdmlldyIsInN5c3RlbXMtdmlldyIsImJhc2ljcyJdLCJmYWNpbGl0eU5hbWUiOiJFTEkgLSBCZWFtbGluZXMiLCJmYWNpbGl0eUNvZGUiOiJCIiwiZXhwIjo0ODc4MzkwMDE4LCJqdGkiOiJqYW4udGVzdEBnbWFpbC5jb20iLCJzdWIiOiIyM2RiMDVkNC1hNjM5LTQ1MGQtODAxMi03MjE1OWFhNGUyNjgifQ.XDR63JAMmTrPJh1ftVwvUXJ8LZl5lwXdhYLcC3xLrj4',
            facilityCode: 'B',
            facility: 'ELI - Beamlines',
            uid: '23db05d4-a639-450d-8012-72159aa4e268',
            fullName: 'test test'
          },
          expires: '2026-09-26T20:20:18.914Z'
        }
      }
    : { session: {} }
}

export const providers = {
  'azure-ad-beamlines': {
    id: 'azure-ad-beamlines',
    name: 'Azure Active Directory',
    type: 'oauth',
    signinUrl: 'http://localhost:5001/api/auth/signin/azure-ad-beamlines',
    callbackUrl: 'http://localhost:5001/api/auth/callback/azure-ad-beamlines'
  },
  credentials: {
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    signinUrl: 'http://localhost:5001/api/auth/signin/credentials',
    callbackUrl: 'http://localhost:5001/api/auth/callback/credentials'
  }
}

export const csrfToken = {
  csrfToken: 'd7a0e9afbe7e0b20a45a6669ee8303250886439c23188185e2f585e17833c758'
}

export const credentials = { url: 'http://localhost:5001/dashboard' }
