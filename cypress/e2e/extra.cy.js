describe('Extra Tests - Advanced Patterns & Edge Cases', () => {
  // ============================================================
  // Additional Tests: Visibility & Interaction Patterns
  // ============================================================
  describe('Advanced Visibility Tests', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com')
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
    })

    it('should verify product descriptions are visible', () => {
      // Check that product descriptions exist and are visible
      cy.get('.inventory_item_desc').should('be.visible').and('have.length.greaterThan', 0)
      
      // Each description should contain text
      cy.get('.inventory_item_desc').first().should('not.be.empty')
      cy.screenshot('product-descriptions-visible')
    })

    it('should verify footer links are visible when scrolled to bottom', () => {
      // Scroll to bottom of page
      cy.get('body').scrollTo('bottom')
      cy.screenshot('scrolled-to-bottom')

      // Verify footer/additional content if visible
      cy.get('.footer').should('be.visible')
      cy.screenshot('footer-visible')
    })

    it('should verify product link is clickable', () => {
      // Click on product name to view product detail
      cy.contains('Sauce Labs Backpack').click()
      cy.screenshot('product-detail-page')

      // Verify we are on product detail page
      cy.get('.inventory_details').should('be.visible')
      cy.get('.inventory_details_img').should('be.visible')
    })
  })

  // ============================================================
  // Advanced Dropdown Tests with Multiple Selections
  // ============================================================
  describe('Advanced Dropdown Interactions', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com')
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
    })

    it('should verify all sort options are available in dropdown', () => {
      cy.get('[data-test="product_sort_container"]').click()
      
      // Verify all sort options exist
      cy.contains('Name (A to Z)').should('be.visible')
      cy.contains('Name (Z to A)').should('be.visible')
      cy.contains('Price (low to high)').should('be.visible')
      cy.contains('Price (high to low)').should('be.visible')
      
      cy.screenshot('all-sort-options-visible')
    })

    it('should switch between different sort options sequentially', () => {
      // Test sorting by Name A to Z
      cy.get('[data-test="product_sort_container"]').click()
      cy.contains('Name (A to Z)').click()
      cy.screenshot('sort-a-to-z')

      // Switch to Price high to low
      cy.get('[data-test="product_sort_container"]').click()
      cy.contains('Price (high to low)').click()
      cy.screenshot('sort-high-to-low')

      // Switch back to default
      cy.get('[data-test="product_sort_container"]').click()
      cy.contains('Name (A to Z)').click()
      cy.screenshot('sort-back-to-default')
    })

    it('should verify sorting persists when adding items to cart', () => {
      // Sort by price low to high
      cy.get('[data-test="product_sort_container"]').click()
      cy.contains('Price (low to high)').click()

      // Get first product name (lowest price)
      cy.get('.inventory_item_name').first().then($name => {
        const firstName = $name.text()

        // Add item to cart
        cy.get('.btn_inventory').first().click()

        // Verify sorting still maintained
        cy.get('.inventory_item_name').first().should('have.text', firstName)
        cy.screenshot('sorting-maintained-after-add')
      })
    })
  })

  // ============================================================
  // Advanced Logout & Session Tests
  // ============================================================
  describe('Advanced Logout Scenarios', () => {
    it('should handle logout from different pages', () => {
      // Login
      cy.visit('https://www.saucedemo.com')
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()

      // Add item to cart and go to cart page
      cy.get('.btn_inventory').first().click()
      cy.get('.shopping_cart_link').click()
      cy.screenshot('on-cart-page')

      // Logout from cart page
      cy.get('#react-burger-menu-btn').click()
      cy.contains('Logout').click()

      // Verify logged out
      cy.url().should('eq', 'https://www.saucedemo.com/')
      cy.get('#login-button').should('be.visible')
      cy.screenshot('logged-out-from-cart')
    })

    it('should prevent access to protected pages after logout', () => {
      // Login
      cy.visit('https://www.saucedemo.com')
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()

      // Logout
      cy.get('#react-burger-menu-btn').click()
      cy.contains('Logout').click()

      // Try to access cart directly
      cy.visit('https://www.saucedemo.com/cart')
      cy.url().should('eq', 'https://www.saucedemo.com/')
      cy.screenshot('redirected-from-protected-cart')

      // Try to access checkout
      cy.visit('https://www.saucedemo.com/checkout-step-one')
      cy.url().should('eq', 'https://www.saucedemo.com/')
      cy.screenshot('redirected-from-protected-checkout')
    })
  })

  // ============================================================
  // Screenshot Tests - Full Page & Element Screenshots
  // ============================================================
  describe('Advanced Screenshot Techniques', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com')
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
    })

    it('should take screenshots of individual product items', () => {
      // Take screenshot of first product
      cy.get('.inventory_item').first().screenshot('first-product-item')
      
      // Take screenshot of product image
      cy.get('.inventory_item_img img').first().screenshot('first-product-image')

      // Take screenshot of add to cart button
      cy.get('.btn_inventory').first().screenshot('first-add-to-cart-button')
    })

    it('should take full page screenshots at different scroll positions', () => {
      cy.screenshot('full-page-top')

      // Scroll to middle
      cy.get('.inventory_list').scrollTo('center')
      cy.screenshot('full-page-middle')

      // Scroll to bottom
      cy.get('.inventory_list').scrollTo('bottom')
      cy.screenshot('full-page-bottom')
    })

    it('should capture comparison screenshots before and after interaction', () => {
      // Before adding items
      cy.screenshot('before-adding-items')

      // Add multiple items
      cy.get('.btn_inventory').eq(0).click()
      cy.get('.btn_inventory').eq(1).click()
      cy.get('.btn_inventory').eq(2).click()

      // After adding items
      cy.screenshot('after-adding-three-items')

      // Verify cart badge shows correct count
      cy.get('.shopping_cart_link .shopping_cart_badge').should('contain', '3')
    })
  })

  // ============================================================
  // Advanced cy.contains() Patterns
  // ============================================================
  describe('Advanced cy.contains() Usage', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com')
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
    })

    it('should find elements with case-insensitive contains', () => {
      // cy.contains() is case-sensitive by default, so we'll use it precisely
      cy.contains('Sauce Labs Backpack').should('be.visible')
      cy.screenshot('found-via-contains')
    })

    it('should chain contains with other selectors', () => {
      // Find specific product and get its price
      cy.contains('Sauce Labs Bolt T-Shirt')
        .parents('.inventory_item')
        .find('.inventory_item_price')
        .then($price => {
          const priceText = $price.text()
          expect(priceText).to.include('$')
        })
      
      cy.screenshot('found-price-via-contains-chain')
    })

    it('should find and click multiple items using contains in loop', () => {
      const itemsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']
      
      itemsToAdd.forEach(itemName => {
        cy.contains(itemName)
          .parents('.inventory_item')
          .find('.btn_inventory')
          .click()
      })

      // Verify all items added
      cy.get('.shopping_cart_link .shopping_cart_badge').should('contain', '3')
      cy.screenshot('multiple-items-added-via-contains')
    })

    it('should use contains for navigation', () => {
      // Navigate using button text
      cy.get('.shopping_cart_link').click()
      cy.contains('Sauce Labs Backpack').should('be.visible')
      
      // Continue shopping using button text
      cy.contains('Continue Shopping').click()
      cy.url().should('include', '/inventory')
      cy.screenshot('navigation-via-contains')
    })

    it('should verify error/success messages using contains', () => {
      // Go to checkout without adding items
      cy.get('.shopping_cart_link').click()
      cy.contains('Checkout').click()

      // Fill in information
      cy.get('[data-test="firstName"]').type('John')
      cy.get('[data-test="lastName"]').type('Doe')
      cy.get('[data-test="postalCode"]').type('12345')
      cy.get('[data-test="continue"]').click()

      // Complete order and look for success message
      cy.contains('Finish').click()
      cy.contains('Thank you for your order').should('be.visible')
      cy.screenshot('order-success-message')
    })
  })

  // ============================================================
  // Integration Tests - Combined Functionality
  // ============================================================
  describe('Integration Tests - Multiple Concepts Combined', () => {
    it('should add filtered/sorted items and verify in cart', () => {
      cy.visit('https://www.saucedemo.com')
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
      cy.screenshot('step-1-logged-in')

      // Sort by price low to high
      cy.get('[data-test="product_sort_container"]').click()
      cy.contains('Price (low to high)').click()
      cy.screenshot('step-2-sorted')

      // Add the cheapest items using contains
      cy.contains('Sauce Labs Onesie')
        .parents('.inventory_item')
        .find('.btn_inventory')
        .click()
      
      cy.contains('Sauce Labs Bike Light')
        .parents('.inventory_item')
        .find('.btn_inventory')
        .click()
      cy.screenshot('step-3-added-items')

      // Go to cart and verify
      cy.get('.shopping_cart_link').click()
      cy.contains('Sauce Labs Onesie').should('be.visible')
      cy.contains('Sauce Labs Bike Light').should('be.visible')
      cy.screenshot('step-4-items-in-cart')

      // Remove one item using contains
      cy.contains('Sauce Labs Bike Light')
        .parents('.cart_item')
        .find('button')
        .click()
      cy.screenshot('step-5-item-removed')

      // Verify only one item remains
      cy.contains('Sauce Labs Onesie').should('be.visible')
      cy.contains('Sauce Labs Bike Light').should('not.exist')
    })

    it('should demonstrate complete workflow with screenshots at key points', () => {
      // Point 1: Login page
      cy.visit('https://www.saucedemo.com')
      cy.screenshot('workflow-01-login-page')

      // Point 2: Login
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
      cy.screenshot('workflow-02-after-login')

      // Point 3: After sorting
      cy.get('[data-test="product_sort_container"]').click()
      cy.contains('Price (low to high)').click()
      cy.screenshot('workflow-03-after-sorting')

      // Point 4: Items added
      cy.contains('Sauce Labs Onesie')
        .parents('.inventory_item')
        .find('.btn_inventory')
        .click()
      cy.screenshot('workflow-04-item-added')

      // Point 5: Cart page
      cy.get('.shopping_cart_link').click()
      cy.screenshot('workflow-05-cart-page')

      // Point 6: Checkout info
      cy.contains('Checkout').click()
      cy.get('[data-test="firstName"]').type('Jane')
      cy.get('[data-test="lastName"]').type('Smith')
      cy.get('[data-test="postalCode"]').type('54321')
      cy.get('[data-test="continue"]').click()
      cy.screenshot('workflow-06-checkout-info')

      // Point 7: Order complete
      cy.contains('Finish').click()
      cy.screenshot('workflow-07-order-complete')

      // Point 8: Logout
      cy.get('#react-burger-menu-btn').click()
      cy.contains('Logout').click()
      cy.screenshot('workflow-08-after-logout')
    })
  })
})
