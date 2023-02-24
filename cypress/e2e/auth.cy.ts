import { SCRENARIOS, setApiMocks } from './shared'

beforeEach(() => {
  cy.clearLocalStorage()
  cy.clearCookies()
})

export const setCookies = () => {
  cy.setCookie(
    'next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..OufaKx6IulFPkFmy.uKKkEieJXNaK9jW54-L617BcedZWwxYN5Fz2yOby76qinBYkVPAB93SN-O-db6BdUofpdUww5OMpMLQb4-H7-PcZOpTmcrjkcCzqa5ueI48539qitlNFu0wjDavVKXxwJZ-yBsUrmk1cnQ_qiqOFRgNpv-tR7ZNyXZYEb0b6umObZWNpidtFcTPdFii4KFZTaQN71xVUSVdfIHNPJ0ZAfuUYCwJdGnnNtubmPEd5f_g7J07kJ1S4RM4HOWrbtFs6HVvojSwXrjQJhjwOuaF1cic0Baz1u018zQHGMa7oyJYMFfTuUMWn7zeMgDa7Ojn5znxGj5g4FZxvj_VUM7lcXwIUVrvcbMIZHNqsJ3zq8g0YrSHqKGBPcpGZ3EvtLDYEuu-p89RP1_RBlcP9gadO_iyqWu80kftb05usI2C390W3LSlDNp50Az38JQAflMeR9ZHriXFuneTZqBAs-WO507uiXbRztWN0vHGYKvNnWWSYZYbIja6N_FcFYRV6FKwyfcDHv94QFY2ZHYL-6Fai6hqeP2q5KVF776JwHvZdgvikNYMzuYaJO3XG2RcMGVhS27Zd3SrnVMqaeU0RKJjek50j-gKq968QbMq6QOfs.6eBjzlr7rWe0ytpvlzqkVA',
  )
  cy.setCookie('next-auth.callback-url', 'http%3A%2F%2Flocalhost%3A5001%2F')
  cy.setCookie(
    'next-auth.csrf-token',
    'a4968643cb3ceeb56522fc1a165e410b52b4c3a7bebad1cc4ebdd064f2cc70a0%7C6173f4a7d2ea601db4c09da9c65d375b78f144875951d33f360b006ab06701b0',
  )
}

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
    cy.visit(Cypress.env('host'))
    cy.wait(['@session'])
    cy.contains('Sign in to ELI - PANDA')
    cy.get('input[name=username]').clear().type('admin')
    cy.get('input[name=password]').clear().type('elipanda2022')
    setApiMocks(SCRENARIOS.customSession.session(true))
    setCookies()
    cy.contains('Sign In').click()
    cy.wait(['@providers', '@csrf', '@credentials', '@session'])
    cy.url().should('include', 'dashboard')
  })
  it('Sign Out', () => {
    setApiMocks(SCRENARIOS.customSession.session(true))
    cy.visit(Cypress.env('host') + '/dashboard')
    setCookies()
    cy.wait(['@session'])
    setApiMocks(SCRENARIOS.customSession.session(false))
    cy.get('[data-testid="layout-profile"]').click()
    cy.contains('Sign out').click()
    cy.contains('Sign in to ELI - PANDA')
  })
})

describe('Profile', () => {
  it('Profile modal', () => {
    setApiMocks(SCRENARIOS.customSession.session(true))
    setCookies()
    cy.visit(Cypress.env('host') + '/dashboard')
    cy.wait(['@session'])
    cy.get('[data-testid="profile-modal"]').should('not.exist')
    cy.get('[data-testid="layout-profile"]').click()
    cy.contains('Your Profile').click()
    cy.get('[data-testid="profile-modal"]').should('exist')
    cy.contains('Albert Einstein')
    cy.get('[data-testid="profile-modal-button-close"]').click()
  })
})
