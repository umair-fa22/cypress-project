describe('Assertion Practice - saucedemo.com', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
  })

  // Assertion 1: be.visible
  it('should assert that the shopping cart icon is visible', () => {
    cy.get('.shopping_cart_link').should('be.visible')
  })

  // Assertion 2: have.text
  it('should assert the Products heading has correct text', () => {
    cy.get('.title').should('have.text', 'Products')
  })

  // Assertion 3: have.attr — back to login page to check button type
  it('should assert the login button has type submit', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#login-button').should('have.attr', 'type', 'submit')
  })

  // Negative Assertion: not.exist
  it('should assert error message does NOT exist on successful login', () => {
    cy.get('[data-test="error"]').should('not.exist')
  })

})