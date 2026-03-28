# Vollmed Cypress Testing Project

This repository contains automated tests for the **Vollmed** healthcare platform. The project utilizes **Cypress** to ensure the quality and reliability of the application's core features, including user registration, clinic login, and dashboard functionality, as well as API testing.

## 🚀 Technologies Used

*   [Cypress](https://www.cypress.io/) - End-to-end and API testing framework.
*   [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Programming language.
*   [Faker.js](https://fakerjs.dev/) - For generating realistic mock data.
*   [Mochawesome](https://v4.mochawesome.jsonresume.org/) - For generating detailed HTML test reports.
*   [ESLint](https://eslint.org/) - To maintain code quality and standards.
*   [Cypress Plugin API](https://github.com/filiphric/cypress-plugin-api) - For improved API testing visualization.

## 📋 Features

*   **E2E Testing:** Automated flows for successful registration, clinic login, and dashboard navigation.
*   **API Testing:** Validation of backend endpoints and responses.
*   **Responsive Testing:** Specific configurations to run tests on tablet viewports.
*   **Custom Commands:** Optimized test scripts using reusable Cypress commands.
*   **Data Driven Testing:** Usage of fixtures and dynamic data generation.
*   **Reporting:** Automatic generation of HTML reports after test execution.

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v14 or higher recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 💻 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/JessyTeixeira-QA/vollmed_cypress.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd vollmed_cypress
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## 🧪 Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npx cypress open
```

### Run Tests in Headless Mode
```bash
npx cypress run
```

### Run Tests with Specific Configurations
*   **Tablet Viewport:**
    ```bash
    npm run test:tablet
    ```
*   **Specific Browser (Edge):**
    ```bash
    npm run test:browser:edge
    ```

## 🧹 Linting

To check for code style issues:
```bash
npm run lint
```

To automatically fix linting issues:
```bash
npm run lint:fix
```

## 📊 Reports

Test reports are automatically generated in the `cypress/results` folder using Mochawesome. You can view the HTML files in any web browser to see the results of the latest test runs.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Developed by [Jessy Teixeira](https://github.com/JessyTeixeira-QA)
