// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Custom Command: login
// Usage: cy.login('username', 'password')
// Cypress.Commands.add('login', (username, password) => {
//   cy.visit('https://www.saucedemo.com')
//   cy.get('#user-name').type(username)
//   cy.get('#password').type(password)
//   cy.get('#login-button').click()
// })

// // Custom Command: addFirstItemToCart
// // Usage: cy.addFirstItemToCart()
// Cypress.Commands.add('addFirstItemToCart', () => {
//   cy.get('.btn_primary').first().click()
//   cy.get('.shopping_cart_link').click()
// })

// Custom login command for saucedemo.com
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.contains('button', 'LOGIN').click();
  // Wait for navigation to complete
  cy.url().should('include', '/inventory.html');
});

// Custom command to logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-test="open-menu"]').click();
  cy.contains('a', 'Logout').click();
  cy.url().should('include', '/index.html');
});

// Custom command to add item to cart by name
Cypress.Commands.add('addToCartByName', (productName) => {
  cy.contains(productName)
    .parent()
    .parent()
    .contains('button', 'Add to cart')
    .click();
});

// Custom command to verify product visibility
Cypress.Commands.add('verifyProductVisible', (productName) => {
  cy.contains('.inventory_item_name', productName).should('be.visible');
});

