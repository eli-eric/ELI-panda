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
    cy.contains('GENERAL FILES').should('exist')
  })

  it('Dashboard - Systems', () => {
    cy.get("[data-testid='tile-Systems']").click()
    cy.url().should('include', '/systems')
  })

  it('Dashboard - Catalogue', () => {
    cy.get("[data-testid='tile-Catalogue']").click()
    cy.url().should('include', '/catalogue')
  })

  it('Dashboard - Orders', () => {
    cy.get("[data-testid='tile-Orders']").click()
    cy.url().should('include', '/orders')
  })

  it('Dashboard - Room Cards', () => {
    cy.get("[data-testid='tile-Room Cards']").click()
    cy.url().should('include', '/room-cards')
  })

  it('Dashboard - Users', () => {
    cy.get("[data-testid='tile-Users']").click()
    cy.url().should('include', 'administration/users')
  })

  it('Dashboard - Codebooks', () => {
    cy.get("[data-testid='tile-Codebooks']").click()
    cy.url().should('include', '/codebooks')
  })
})
