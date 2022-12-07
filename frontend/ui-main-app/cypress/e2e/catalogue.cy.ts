import { SCRENARIOS, setApiMocks } from './panda.shared'

beforeEach(() => {
  cy.clearLocalStorage()
  cy.clearCookies()
})

describe('Catalogue', () => {
  it('Catalogue', () => {
    setApiMocks(SCRENARIOS.signIn.custonSession(true))
    cy.visit(Cypress.env('host') + '/catalogue')
    cy.wait(['@session'])
    cy.url().should('include', 'catalogue')
    cy.wait(['@catalogueCategories'])
    cy.contains('Beam characterization')
    cy.contains('Motion')
    cy.contains('Vacuum Technology')
  })
  it('Catalogue search', () => {
    setApiMocks(SCRENARIOS.signIn.custonSession(true))
    cy.visit(Cypress.env('host') + '/catalogue')
    cy.wait(['@session'])
    cy.url().should('include', 'catalogue')
    cy.wait(['@catalogueCategories'])
    cy.contains('Beam characterization')
    cy.contains('Motion')
    cy.contains('Vacuum Technology')
  })
  it('Catalogue last category', () => {
    setApiMocks(SCRENARIOS.signIn.custonSession(true))
    cy.visit(Cypress.env('host') + '/catalogue')
    cy.wait(['@session'])
    cy.url().should('include', 'catalogue')
    cy.wait(['@catalogueCategories'])
    cy.contains('Beam characterization')
    cy.contains('Motion')
    cy.contains('Vacuum Technology')
  })
  it('Catalogue last category search', () => {
    setApiMocks(SCRENARIOS.signIn.custonSession(true))
    cy.visit(Cypress.env('host') + '/catalogue')
    cy.wait(['@session'])
    cy.url().should('include', 'catalogue')
    cy.wait(['@catalogueCategories'])
    cy.contains('Beam characterization')
    cy.contains('Motion')
    cy.contains('Vacuum Technology')
  })
})

describe('Item', () => {
  it('Item detail', () => {})
})
