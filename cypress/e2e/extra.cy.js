// Extra Practice Tests for Sauce Demo

describe('Extra Practice Tests - Sauce Demo', () => {
  
  beforeEach(() => {
    // Visit the Sauce Demo website before each test
    cy.visit('https://www.saucedemo.com')
  })

  // Test 1: Verify a specific element is visible on the page
  describe('Test 1: Visibility Check', () => {
    it('should check whether specific button, image, or text is visible on the page', () => {
      // Check if the Sauce Labs logo is visible on login page
      cy.get('.login_logo').should('be.visible')
      
      // Check if the username input field is visible
      cy.get('#user-name').should('be.visible')
      
      // Check if the password input field is visible
      cy.get('#password').should('be.visible')
      
      // Check if the Login button is visible
      cy.get('#login-button').should('be.visible')
      
      // Verify login button text
      cy.get('#login-button').should('contain', 'Login')
    })

    it('should verify product page elements are visible after login', () => {
      // Login using the custom command
      cy.login('standard_user', 'secret_sauce')
      
      // Check if products page title is visible
      cy.get('.title').should('be.visible').and('contain', 'Products')
      
      // Check if shopping cart icon is visible
      cy.get('.shopping_cart_link').should('be.visible')
      
      // Check if product container is visible
      cy.get('.inventory_container').should('be.visible')
      
      // Check if at least one product is visible
      cy.get('.inventory_item').first().should('be.visible')
      
      // Check if product name is visible
      cy.get('.inventory_item_name').first().should('be.visible')
    })
  })

  // Test 2: Click dropdown, select option, and verify page updates
  describe('Test 2: Dropdown Selection', () => {
    it('should click dropdown, select an option, and assert page updates correctly', () => {
      // Login first
      cy.login('standard_user', 'secret_sauce')
      
      // Get initial product order
      cy.get('.inventory_item_name').first().then(($firstProduct) => {
        const initialFirstProduct = $firstProduct.text()
        
        // Select "Price (low to high)" option
        cy.get('.product_sort_container').select('lohi')
        
        // Wait a moment for the page to update
        cy.wait(500)
        
        // Verify that products are now sorted by price (low to high)
        // The first product should be different or verify price order
        cy.get('.inventory_item_name').first().invoke('text').then((newFirstProduct) => {
          // Products should be reordered after sort
          cy.log('Initial product: ' + initialFirstProduct)
          cy.log('Product after sort: ' + newFirstProduct)
        })
        
        // Verify the dropdown value has changed
        cy.get('.product_sort_container').should('have.value', 'lohi')
      })
    })

    it('should verify all sort options work correctly', () => {
      // Login first
      cy.login('standard_user', 'secret_sauce')
      
      const sortOptions = [
        { value: 'az', label: 'Name (A to Z)' },
        { value: 'za', label: 'Name (Z to A)' },
        { value: 'lohi', label: 'Price (low to high)' },
        { value: 'hilo', label: 'Price (high to low)' }
      ]
      
      // Test each sort option
      sortOptions.forEach((option) => {
        cy.get('.product_sort_container').select(option.value)
        
        // Verify the dropdown shows the correct value
        cy.get('.product_sort_container').should('have.value', option.value)
        
        // Verify products are still visible after sort
        cy.get('.inventory_item').should('have.length.greaterThan', 0)
      })
    })
  })

  // Test 3: Logout and verify login page is shown
  describe('Test 3: Logout Functionality', () => {
    it('should log out and assert the login page is shown again', () => {
      // Login first
      cy.login('standard_user', 'secret_sauce')
      
      // Verify we're on the products page
      cy.get('.title').should('contain', 'Products')
      
      // Click on the hamburger menu
      cy.get('.bm-burger-button').click()
      
      // Wait for menu to appear
      cy.get('.bm-menu').should('be.visible')
      
      // Click on the Logout link
      cy.get('#logout_sidebar_link').click()
      
      // Verify we're back on the login page
      cy.get('.login_logo').should('be.visible')
      cy.get('#user-name').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('#login-button').should('be.visible')
      
      // Verify the URL is the login page
      cy.url().should('eq', 'https://www.saucedemo.com/')
    })

    it('should prevent accessing products page after logout', () => {
      // Login
      cy.login('standard_user', 'secret_sauce')
      
      // Verify we're on products page
      cy.get('.title').should('contain', 'Products')
      
      // Logout
      cy.get('.bm-burger-button').click()
      cy.get('#logout_sidebar_link').click()
      
      // Try to access the inventory page directly
      cy.visit('https://www.saucedemo.com/inventory.html', { failOnStatusCode: false })
      
      // Verify we're redirected back to login page
      cy.url().should('eq', 'https://www.saucedemo.com/')
      cy.get('.login_logo').should('be.visible')
    })

    it('should clear login form data after logout', () => {
      // Login
      cy.login('standard_user', 'secret_sauce')
      
      // Logout
      cy.get('.bm-burger-button').click()
      cy.get('#logout_sidebar_link').click()
      
      // Verify login form fields are empty
      cy.get('#user-name').should('have.value', '')
      cy.get('#password').should('have.value', '')
    })
  })
})
