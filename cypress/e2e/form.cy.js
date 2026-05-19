describe('Form Test - saucedemo.com', () => {

  beforeEach(() => {
    // Login first
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
  })

  // Form Test 1: Add item to cart and fill checkout form
  it('should complete checkout form and show confirmation', () => {

    // Step 1 — Add a product to cart
    cy.get('.btn_primary').first().click()

    // Step 2 — Go to cart
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart')

    // Step 3 — Click Checkout
    cy.get('#checkout').click()
    cy.url().should('include', '/checkout-step-one')

    // Step 4 — Fill the checkout form
    cy.get('#first-name').type('Umair')
    cy.get('#last-name').type('Ali')
    cy.get('#postal-code').type('54000')

    // Step 5 — Submit the form
    cy.get('#continue').click()

    // Step 6 — Assert we reached the overview page
    cy.url().should('include', '/checkout-step-two')
    cy.get('.title').should('have.text', 'Checkout: Overview')
  })

})