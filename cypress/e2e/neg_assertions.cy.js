describe('Negative Assertions - saucedemo.com', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  // not.exist — error message should not exist before any login attempt
  it('should assert error message does not exist on page load', () => {
    cy.get('[data-test="error"]').should('not.exist')
  })

  // not.be.visible — after successful login, login button should not be visible
  it('should assert login button is not visible after login', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.get('#login-button').should('not.exist')
  })

  // not.have.text — heading should NOT say something wrong
  it('should assert page heading is not called Dashboard', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.get('.title').should('not.have.text', 'Dashboard')
  })

  // not.be.disabled — username field should not be disabled on load
  it('should assert username input is not disabled', () => {
    cy.get('#user-name').should('not.be.disabled')
  })

})