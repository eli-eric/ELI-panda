export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:5001/api/mock-server'
    : 'http://localhost:5001/api/mock-server'
