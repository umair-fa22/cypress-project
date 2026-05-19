# Cypress Project

A comprehensive end-to-end testing project using **Cypress** for testing web applications. This project includes various test suites covering authentication, form validation, navigation, and assertions.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Suites](#test-suites)
- [Configuration](#configuration)
- [Contributing](#contributing)

## 🎯 Overview

This Cypress project contains end-to-end tests designed to validate web application functionality. It includes tests for:
- User authentication (login flows)
- Form submissions and validation
- Application navigation
- Various assertion types
- Custom commands for reusable test logic

## ✨ Features

- **Modern E2E Testing**: Powered by Cypress 15.15.0
- **Organized Test Structure**: Well-organized test suites in the `e2e/` directory
- **Reusable Commands**: Custom commands defined in `support/commands.js`
- **Test Fixtures**: Sample data stored in the `fixtures/` directory
- **Screenshots**: Automatic screenshot capture on test failures

## 🚀 Installation

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cypress-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 📁 Project Structure

```
cypress-project/
├── cypress/
│   ├── e2e/                          # End-to-end test files
│   │   ├── aliases.cy.js             # Tests for Cypress aliases
│   │   ├── assertions.cy.js          # Tests for assertion types
│   │   ├── form.cy.js                # Form validation tests
│   │   ├── login.cy.js               # Login flow tests
│   │   ├── login_cmd.cy.js           # Login tests using custom commands
│   │   ├── navigation.cy.js          # Navigation tests
│   │   └── neg_assertions.cy.js      # Negative assertion tests
│   ├── fixtures/                     # Test data files
│   │   └── example.json              # Sample fixture data
│   ├── support/                      # Support files
│   │   ├── commands.js               # Custom Cypress commands
│   │   └── e2e.js                    # E2E support configuration
│   ├── downloads/                    # Downloaded files during tests
│   └── screenshots/                  # Test failure screenshots
├── cypress.config.js                 # Cypress configuration file
├── package.json                      # Project dependencies and scripts
└── README.md                          # This file
```

## 🧪 Running Tests

### Open Cypress Test Runner
```bash
npx cypress open
```

This opens the Cypress Test Runner where you can:
- View all test files
- Run individual tests or all tests
- See test execution in real-time
- Debug failing tests

### Run Tests in Headless Mode
```bash
npx cypress run
```

This runs all tests in headless mode and generates a test report.

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

### Run Tests with Options
```bash
npx cypress run --browser chrome --headed
```

## 📝 Test Suites

The project includes the following test suites:

| Test File | Purpose |
|-----------|---------|
| `aliases.cy.js` | Tests for Cypress alias functionality |
| `assertions.cy.js` | Tests for various assertion types |
| `form.cy.js` | Form submission and validation tests |
| `login.cy.js` | Standard login flow tests |
| `login_cmd.cy.js` | Login tests using custom commands |
| `navigation.cy.js` | Application navigation tests |
| `neg_assertions.cy.js` | Negative assertion tests |

## ⚙️ Configuration

### Cypress Config (`cypress.config.js`)

The main configuration file includes:
- **allowCypressEnv**: Set to `false` to prevent reading Cypress-specific environment variables
- **e2e**: Configuration for end-to-end tests

For more configuration options, see the [Cypress Documentation](https://docs.cypress.io/guides/references/configuration).

### Custom Commands

Custom commands are defined in `cypress/support/commands.js` and provide reusable test utilities for:
- Login operations
- Form interactions
- Navigation helpers

### Support Files

- `cypress/support/e2e.js`: Imported before all e2e tests run
- `cypress/support/commands.js`: Contains custom Cypress commands

## 🤝 Contributing

To contribute to this project:

1. Create a new branch for your feature
2. Write or update tests as needed
3. Ensure all tests pass
4. Submit a pull request with a clear description

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)

## 📄 License

ISC

---

**Last Updated**: May 2026
