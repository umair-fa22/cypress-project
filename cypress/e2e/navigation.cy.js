describe('Navigation Tests - saucedemo.com', () => {

  beforeEach(() => {
    // Login before each test so we can access the site
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
  })

  // Navigation Test 1: Click a menu link and assert correct page opens
  it('should open the About page when clicked from burger menu', () => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#about_sidebar_link').should('be.visible')
  })

  // Navigation Test 2: Visit 2 different pages and assert correct heading
  it('should show correct headings on two different pages', () => {

    // Page 1 — Products page
    cy.url().should('include', '/inventory')
    cy.get('.title').should('have.text', 'Products')

    // Page 2 — Cart page
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart')
    cy.get('.title').should('have.text', 'Your Cart')
  })

})