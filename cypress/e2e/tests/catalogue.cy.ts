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

  it('Catalogue Category', () => {
    cy.url().should('include', '/catalogue')
    cy.wait('@gqlGetCategoriesQuery')
      .its('response.body.data.catalogueCategories')
      .then((categories: any[]) => {
        expect(categories).to.be.an('array')
        const firstCategory = categories[0]
        cy.wrap(categories).each(category => {
          expect(category).to.have.property('uid')
          expect(category).to.have.property('name')
          expect(category).to.have.property('code')
        })
        cy.wrap(firstCategory).as('firstCategory')
      })

    cy.wait('@gqlGetCategoryQuery')
      .its('response.body.data.catalogueCategories')
      .then((categories: any[]) => {
        expect(categories).to.be.an('array').and.have.length(0)
      })

    cy.get('@firstCategory').then((firstCategory: any) => {
      cy.log(
        'First category UID:',
        firstCategory ? firstCategory.uid : 'undefined'
      )
      if (firstCategory) {
        cy.get(`[data-testid='category-item-${firstCategory.uid}']`).click()
        cy.url().then(url => {
          const urlParams = new URLSearchParams(url.split('?')[1])
          const categoryParam = urlParams.get('category')
          if (categoryParam) {
            const category = JSON.parse(categoryParam)
            expect(category.uid).to.equal(firstCategory.uid)
            expect(category.name).to.equal(firstCategory.name)
          } else {
            throw new Error('Category parameter not found in URL')
          }
        })
      } else {
        cy.log('First category is undefined')
      }
    })
  })
})
