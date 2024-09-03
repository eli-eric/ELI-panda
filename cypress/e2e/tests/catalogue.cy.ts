import { testCredAdmin } from 'cypress/support/testData'
import { aliasQuery } from '../graphql-test-utils'

describe('Catalogue', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('host'))
    cy.loginNextAuth(testCredAdmin)
    cy.visit(Cypress.env('host') + '/catalogue')
    cy.intercept('POST', Cypress.env('host') + '/api/graphql', req => {
      // Queries
      aliasQuery(req, 'GetCategories')
      aliasQuery(req, 'GetCategory')
    })
  })
  it('Catalogue', () => {
    cy.url().should('include', '/catalogue')
    cy.wait('@gqlGetCategoriesQuery')
      .its('response.body.data.catalogueCategories')
      .then(categories => {
        expect(categories).to.be.an('array')

        cy.wrap(categories).each(category => {})
      })
    cy.wait('@gqlGetCategoryQuery')
  })
})
