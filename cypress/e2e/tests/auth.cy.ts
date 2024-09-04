import { testCredAdmin } from 'cypress/support/testData'

describe('login page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('host'))
  })

  it('Sign In', () => {
    cy.log(`Clicking on Sign In`)
    cy.contains('Sign in to ELI - PANDA')
    cy.get('button').contains('Sign In').click()
    cy.contains('username is a required field')
    cy.contains('password is a required field')
    cy.get('input[name="username"]').type('jan.test@gmail.com')
    cy.get('input[name="password"]').type('wwwwwwww')
    cy.get('button').contains('Sign In').click()
    cy.loginNextAuth(testCredAdmin)
    cy.url().should('include', '/dashboard')
  })
})
