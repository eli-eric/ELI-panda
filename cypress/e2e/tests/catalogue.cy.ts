import { testCredAdmin } from 'cypress/support/testData'
import { aliasQuery } from '../graphql-test-utils'

describe('Catalogue', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('host'))
    cy.loginNextAuth(testCredAdmin)
  })
})
