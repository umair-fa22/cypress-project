describe('Login Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  it('Login with valid credentials', () => {
    cy.login('standard_user', 'secret_sauce')

    cy.url().should('include', 'inventory')
  })

  it('Login with invalid password', () => {
    cy.login('standard_user', 'wrong_pass')

    cy.get('[data-test="error"]').should('be.visible')
  })

})