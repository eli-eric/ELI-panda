import {
  prepareGenericDataForTest,
  SCRENARIOS,
  setApiMocks,
  setupServerForTest
} from '../e2e/shared'

before(prepareGenericDataForTest)
beforeEach(() => {
  setupServerForTest()
  cy.clearLocalStorage()
  cy.clearCookies()
})

describe('login', () => {
  it('Sign In', () => {
    cy.visit(Cypress.env('host'))
    cy.contains('Sign in to ELI - PANDA')
    cy.get('input[name=username]').clear().type('admin')
    cy.get('input[name=password]').clear().type('elipanda2022')
    setApiMocks(SCRENARIOS.signIn.custonSession(true))
    cy.contains('Sign In').click()
    cy.wait(['@providers', '@csrf', '@credentials', '@session'])
    cy.url().should('include', 'dashboard')
  })
  it('Sign Out', () => {
    setApiMocks(SCRENARIOS.signIn.custonSession(true))
    cy.visit(Cypress.env('host') + '/dashboard')
    cy.get('[data-testid="dropdown-menu"]').click()
    setApiMocks(SCRENARIOS.signIn.custonSession(false))
    cy.get('[data-testid="dropdown-menu-signout"]').click()
    cy.contains('Sign in to ELI - PANDA')
  })
})
