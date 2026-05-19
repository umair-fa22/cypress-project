describe('Login Tests - saucedemo.com', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  // Login Test 1: Valid credentials
  it('should login successfully with valid credentials', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.url().should('include', '/inventory')
    cy.get('.inventory_list').should('be.visible')
  })

  // Login Test 2: Wrong password
  it('should show error message on incorrect password', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain', 'Username and password do not match')
  })

  // Login Test 3: Empty fields
  it('should show validation message when fields are empty', () => {
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain', 'Username is required')
  })

})