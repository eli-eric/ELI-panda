import { SCRENARIOS, setApiMocks } from './shared'

beforeEach(() => {
  cy.clearLocalStorage()
  cy.clearCookies()
})

describe('login', () => {
  it('Sign In', () => {
    setApiMocks(SCRENARIOS.customSession.session(false))
    cy.visit(Cypress.env('host') + '/dashboard')
    cy.wait(['@session'])
    cy.contains('Sign in to ELI - PANDA')
    cy.visit(Cypress.env('host') + '/catalogue')
    cy.wait(['@session'])
    cy.contains('Sign in to ELI - PANDA')
    cy.visit(Cypress.env('host') + '/systems')
    cy.wait(['@session'])
    cy.contains('Sign in to ELI - PANDA')
    cy.visit(Cypress.env('host') + '/reports')
    cy.wait(['@session'])
    cy.contains('Sign in to ELI - PANDA')
    cy.visit(Cypress.env('host'))
    cy.wait(['@session'])
    cy.contains('Sign in to ELI - PANDA')
    cy.get('input[name=username]').clear().type('admin')
    cy.get('input[name=password]').clear().type('elipanda2022')
    setApiMocks(SCRENARIOS.customSession.session(true))
    cy.contains('Sign In').click()
    cy.wait(['@providers', '@csrf', '@credentials', '@session'])
    cy.url().should('include', 'dashboard')
  })
  it('Sign Out', () => {
    setApiMocks(SCRENARIOS.customSession.session(true))
    cy.visit(Cypress.env('host') + '/dashboard')
    cy.wait(['@session'])
    setApiMocks(SCRENARIOS.customSession.session(false))
    cy.get('[data-testid="sign-out"]').click()
    cy.contains('Sign in to ELI - PANDA')
  })
})

describe('Profile', () => {
  it('Profile modal', () => {
    setApiMocks(SCRENARIOS.customSession.session(true))
    cy.visit(Cypress.env('host') + '/dashboard')
    cy.wait(['@session'])
    cy.get('[data-testid="profile-modal"]').should('not.exist')
    cy.get('[data-testid="view-profile"]').click()
    cy.get('[data-testid="profile-modal"]').should('exist')
    cy.contains('Albert Einstein')
    cy.get('[data-testid="profile-modal-button-close"]').click()
  })
})
