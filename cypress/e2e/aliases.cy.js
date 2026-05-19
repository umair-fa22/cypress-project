describe('Alias Practice - saucedemo.com', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  it('should use alias to interact with username field multiple times', () => {

    // Save the username input as an alias
    cy.get('#user-name').as('usernameField')

    // Use the alias to type into the field
    cy.get('@usernameField').type('standard_user')

    // Use the alias again to assert it has the correct value
    cy.get('@usernameField').should('have.value', 'standard_user')

    // Complete login
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // Save cart button as alias
    cy.get('.shopping_cart_link').as('cartIcon')

    // Use alias to assert cart is visible
    cy.get('@cartIcon').should('be.visible')

    // Use alias again to click it
    cy.get('@cartIcon').click()

    // Assert we navigated to cart page
    cy.url().should('include', 'cart')
  })

})