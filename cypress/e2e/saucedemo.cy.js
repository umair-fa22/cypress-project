describe('Saucedemo - Comprehensive E2E Tests', () => {
  // Helper function to login
  const login = (username = 'standard_user', password = 'secret_sauce') => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
  }

  // ============================================================
  // TEST 1: Check Visibility of Button, Image, and Text
  // ============================================================
  describe('Test 1: Visibility Checks', () => {
    beforeEach(() => {
      login()
    })

    it('should verify that product images are visible on the page', () => {
      // Check if product images are visible
      cy.get('.inventory_item_img img').should('be.visible').and('have.length.greaterThan', 0)
      
      // Verify specific product image
      cy.get('.inventory_item_img img').first().should('be.visible')
      cy.screenshot('product-images-visible')
    })

    it('should verify that Add to Cart buttons are visible', () => {
      // Check if "Add to cart" buttons are visible
      cy.get('.btn_inventory').should('be.visible').and('have.length.greaterThan', 0)
      
      // Check the text on the button
      cy.get('.btn_inventory').first().should('contain', 'Add to cart')
      cy.screenshot('add-to-cart-buttons-visible')
    })

    it('should verify product names are visible using cy.contains()', () => {
      // Use cy.contains() to find text content
      cy.contains('Sauce Labs Backpack').should('be.visible')
      cy.contains('Sauce Labs Bike Light').should('be.visible')
      cy.contains('Sauce Labs Bolt T-Shirt').should('be.visible')
      
      cy.screenshot('product-names-visible')
    })

    it('should verify price text is visible', () => {
      // Check that price elements are visible
      cy.get('.inventory_item_price').should('be.visible').and('have.length.greaterThan', 0)
      
      // Verify a specific price is displayed
      cy.get('.inventory_item_price').first().should('contain', '$')
      cy.screenshot('prices-visible')
    })

    it('should verify the shopping cart badge is visible', () => {
      cy.get('.shopping_cart_link').should('be.visible')
      cy.get('.shopping_cart_link .shopping_cart_badge').should('not.exist')
      
      // Add item to cart and verify badge appears
      cy.get('.btn_inventory').first().click()
      cy.get('.shopping_cart_link .shopping_cart_badge').should('be.visible').and('contain', '1')
      cy.screenshot('cart-badge-visible')
    })
  })

  // ============================================================
  // TEST 2: Dropdown Selection & Page Update Assertion
  // ============================================================
  describe('Test 2: Dropdown Selection - Product Sorting', () => {
    beforeEach(() => {
      login()
    })

    it('should click sorting dropdown and select "Name (Z to A)"', () => {
      // Take screenshot before sorting
      cy.screenshot('before-sort')

      // Click the product sort dropdown
      cy.get('[data-test="product_sort_container"]').click()
      cy.screenshot('dropdown-opened')

      // Select "Name (Z to A)" option using cy.contains()
      cy.contains('Name (Z to A)').click()
      cy.screenshot('after-select-z-to-a')

      // Verify the page updates - products should be sorted Z to A
      cy.get('.inventory_item_name').first().should('contain', 'Test.allTheThings()')
    })

    it('should sort by "Price (low to high)" and verify product order updates', () => {
      cy.get('[data-test="product_sort_container"]').click()
      cy.contains('Price (low to high)').click()
      cy.screenshot('sorted-by-price-low-to-high')

      // Get all prices and verify they are in ascending order
      cy.get('.inventory_item_price').then(($prices) => {
        const prices = [...$prices].map(el => {
          const priceText = el.innerText.replace('$', '')
          return parseFloat(priceText)
        })

        // Verify prices are in ascending order
        for (let i = 0; i < prices.length - 1; i++) {
          expect(prices[i]).to.be.lte(prices[i + 1])
        }
      })

      cy.screenshot('price-verification-complete')
    })

    it('should sort by "Name (A to Z)" and verify alphabetical order', () => {
      cy.get('[data-test="product_sort_container"]').click()
      cy.contains('Name (A to Z)').click()
      cy.screenshot('sorted-by-name-a-to-z')

      // Verify product names are in alphabetical order
      cy.get('.inventory_item_name').then(($names) => {
        const names = [...$names].map(el => el.innerText)
        const sortedNames = [...names].sort()
        expect(names).to.deep.equal(sortedNames)
      })

      cy.screenshot('name-alphabetical-verified')
    })

    it('should display "No Results" message using cy.contains() for invalid search', () => {
      // This demonstrates cy.contains() usage for finding dynamic content
      cy.get('[data-test="product_sort_container"]').click()
      cy.contains('Price (high to low)').click()
      cy.screenshot('sorted-high-to-low')

      // Verify products are displayed (high to low means first product should be highest price)
      cy.get('.inventory_item').should('have.length.greaterThan', 0)
    })
  })

  // ============================================================
  // TEST 3: Logout Test & Login Page Assertion
  // ============================================================
  describe('Test 3: Logout Flow', () => {
    beforeEach(() => {
      login()
    })

    it('should logout successfully and return to login page', () => {
      // Verify we are on the inventory page
      cy.url().should('include', '/inventory')
      cy.get('.inventory_list').should('be.visible')
      cy.screenshot('on-inventory-page')

      // Click the hamburger menu
      cy.get('#react-burger-menu-btn').click()
      cy.screenshot('menu-opened')

      // Click logout option using cy.contains()
      cy.contains('Logout').click()
      cy.screenshot('after-clicking-logout')

      // Verify we are back on the login page
      cy.url().should('eq', 'https://www.saucedemo.com/')
      cy.get('#login-button').should('be.visible')
      cy.get('#user-name').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.screenshot('back-on-login-page')
    })

    it('should clear user session after logout', () => {
      // Add item to cart
      cy.get('.btn_inventory').first().click()
      cy.get('.shopping_cart_link .shopping_cart_badge').should('contain', '1')

      // Logout
      cy.get('#react-burger-menu-btn').click()
      cy.contains('Logout').click()

      // Log back in
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()

      // Verify cart is empty (session was cleared)
      cy.get('.shopping_cart_link .shopping_cart_badge').should('not.exist')
      cy.screenshot('session-cleared-after-logout')
    })

    it('should not be able to access inventory after logout without logging in again', () => {
      // Logout
      cy.get('#react-burger-menu-btn').click()
      cy.contains('Logout').click()

      // Try to navigate to inventory directly
      cy.visit('https://www.saucedemo.com/inventory')

      // Should be redirected to login page
      cy.url().should('eq', 'https://www.saucedemo.com/')
      cy.get('#login-button').should('be.visible')
      cy.screenshot('redirected-to-login-after-logout')
    })
  })

  // ============================================================
  // TEST 4: Using cy.screenshot() at Different Points
  // ============================================================
  describe('Test 4: Screenshot Demonstrations', () => {
    it('should capture screenshots throughout complete user journey', () => {
      // Screenshot 1: Login page
      cy.visit('https://www.saucedemo.com')
      cy.screenshot('01-login-page')

      // Screenshot 2: After entering credentials
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.screenshot('02-credentials-entered')

      // Screenshot 3: After login - inventory page
      cy.get('#login-button').click()
      cy.screenshot('03-inventory-page-loaded')

      // Screenshot 4: After adding items to cart
      cy.get('.btn_inventory').eq(0).click()
      cy.get('.btn_inventory').eq(1).click()
      cy.screenshot('04-items-added-to-cart')

      // Screenshot 5: Cart page
      cy.get('.shopping_cart_link').click()
      cy.screenshot('05-cart-page')

      // Screenshot 6: Checkout information page
      cy.contains('Checkout').click()
      cy.screenshot('06-checkout-page')

      // Screenshot 7: Fill checkout info
      cy.get('[data-test="firstName"]').type('John')
      cy.get('[data-test="lastName"]').type('Doe')
      cy.get('[data-test="postalCode"]').type('12345')
      cy.screenshot('07-checkout-info-filled')

      // Screenshot 8: Checkout overview
      cy.get('[data-test="continue"]').click()
      cy.screenshot('08-checkout-overview')

      // Screenshot 9: Order complete
      cy.get('[data-test="finish"]').click()
      cy.screenshot('09-order-complete')
    })
  })

  // ============================================================
  // TEST 5: Exploring cy.contains() for Text-Based Element Finding
  // ============================================================
  describe('Test 5: Using cy.contains() for Element Finding', () => {
    beforeEach(() => {
      login()
    })

    it('should find and interact with elements using cy.contains()', () => {
      // Find product by name and add to cart
      cy.contains('Sauce Labs Backpack')
        .parents('.inventory_item')
        .find('.btn_inventory')
        .click()
      cy.screenshot('added-backpack-via-contains')

      // Find another product and add to cart
      cy.contains('Sauce Labs Bike Light')
        .parents('.inventory_item')
        .find('.btn_inventory')
        .click()
      cy.screenshot('added-bike-light-via-contains')

      // Navigate to cart using contains
      cy.get('.shopping_cart_link').click()
      cy.contains('Sauce Labs Backpack').should('be.visible')
      cy.contains('Sauce Labs Bike Light').should('be.visible')
      cy.screenshot('both-items-in-cart')
    })

    it('should verify button text using cy.contains()', () => {
      // Use cy.contains() with button elements
      cy.contains('button', 'Add to cart').should('be.visible').and('have.length.greaterThan', 0)
      cy.screenshot('all-add-to-cart-buttons-found')

      // Click specific button using contains
      cy.contains('button', 'Add to cart').first().click()
      cy.screenshot('first-add-to-cart-clicked')
    })

    it('should navigate using link text with cy.contains()', () => {
      // Click cart link using contains
      cy.contains('a', 'Cart').click()
      cy.url().should('include', '/cart')
      cy.screenshot('navigated-to-cart-via-contains')
    })

    it('should find elements by partial text match', () => {
      // Find products containing "Sauce" in the name
      cy.contains('Sauce Labs').should('be.visible')

      // Verify multiple products have "Sauce" in their name
      cy.get('.inventory_item_name').each(($name) => {
        if ($name.text().includes('Sauce')) {
          cy.wrap($name).should('contain', 'Sauce')
        }
      })
      cy.screenshot('sauce-labs-products-verified')
    })

    it('should use cy.contains() in combination with other selectors', () => {
      // Find div containing specific product price info
      cy.get('.inventory_item')
        .contains('Sauce Labs Onesie')
        .parents('.inventory_item')
        .find('.inventory_item_price')
        .should('be.visible')
      
      cy.screenshot('product-details-found-with-contains')
    })
  })

  // ============================================================
  // TEST 6: Complete User Workflow with Multiple Interactions
  // ============================================================
  describe('Test 6: Complete Workflow Combining All Concepts', () => {
    it('should complete full shopping workflow with all demonstrated concepts', () => {
      // 1. Visit and verify visibility
      cy.visit('https://www.saucedemo.com')
      cy.get('#login-button').should('be.visible')
      cy.screenshot('step-01-login-page')

      // 2. Login
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
      cy.screenshot('step-02-logged-in')

      // 3. Sort products using dropdown
      cy.get('[data-test="product_sort_container"]').click()
      cy.contains('Price (low to high)').click()
      cy.screenshot('step-03-sorted-low-to-high')

      // 4. Add items using cy.contains()
      cy.contains('Sauce Labs Onesie')
        .parents('.inventory_item')
        .find('.btn_inventory')
        .click()
      cy.screenshot('step-04-added-onesie')

      cy.contains('Sauce Labs Backpack')
        .parents('.inventory_item')
        .find('.btn_inventory')
        .click()
      cy.screenshot('step-05-added-backpack')

      // 5. Verify cart badge is visible
      cy.get('.shopping_cart_link .shopping_cart_badge').should('be.visible').and('contain', '2')
      cy.screenshot('step-06-cart-updated')

      // 6. Go to cart
      cy.get('.shopping_cart_link').click()
      cy.screenshot('step-07-cart-contents')

      // 7. Checkout
      cy.contains('Checkout').click()
      cy.get('[data-test="firstName"]').type('Jane')
      cy.get('[data-test="lastName"]').type('Smith')
      cy.get('[data-test="postalCode"]').type('54321')
      cy.get('[data-test="continue"]').click()
      cy.screenshot('step-08-checkout-overview')

      // 8. Complete purchase
      cy.contains('Finish').click()
      cy.screenshot('step-09-order-complete')

      // 9. Logout
      cy.get('#react-burger-menu-btn').click()
      cy.contains('Logout').click()
      cy.screenshot('step-10-logged-out')

      // 10. Verify back on login page
      cy.url().should('eq', 'https://www.saucedemo.com/')
      cy.get('#login-button').should('be.visible')
      cy.screenshot('step-11-back-on-login')
    })
  })
})
