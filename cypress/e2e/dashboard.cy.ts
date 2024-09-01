import { testCredAdmin } from 'cypress/support/testData'

describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('host'))
    cy.loginNextAuth(testCredAdmin)
    cy.visit(Cypress.env('host') + '/dashboard')
  })

  it('Dashboard - tiles', () => {
    cy.url().should('include', '/dashboard')
    cy.get("[data-testid='tile-container']").should('exist')
    cy.get("[data-testid='tile-Users']").should('exist')
    cy.get("[data-testid='tile-Codebooks']").should('exist')
    cy.get("[data-testid='tile-Support/Feedback']").should('exist')
    cy.get("[data-testid='tile-Systems']").should('exist')
    cy.get("[data-testid='tile-Catalogue']").should('exist')
    cy.get("[data-testid='tile-Orders']").should('exist')
    cy.get("[data-testid='tile-Room Cards']").should('exist')
  })
})
