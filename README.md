# Hudl Playwright Project

This project contains automated tests for Hudl using [Playwright](https://playwright.dev/).  
It follows a **shift-left** testing philosophy, e2e tests are written with test automation pyramid in mind.

Although this project focuses on Login feature but this project can double up as a boiler plate repo as well.

---

## Prerequisites

- **Node.js** v20 or later
- **npm** (comes with Node.js)
- Access to valid **Hudl coach credentials** stored securely in environment variables

---

## Installation

1. **Clone the repository**

   `git clone https://github.com/oomkarpanditstudent/hudl-pw-ts.git`  
    `cd hudl-pw-ts`

2. **Install dependencies**  
   `npm ci`
3. **Install Playwright browsers**  
   `npx playwright install --with-deps`
4. **Set environment variables (local .env file or via shell - example file is provided)**  
   Below to variables must be set for execution  
   `USER_EMAIL   `  
   `USER_PASSWORD`

## How to execute tests

- **Running Functional Tests Locally (headed)**

      npm run functional:local

- **Running Functional Tests Locally (headless)**

      npm run functional:local:headless

- **Running Accessibility Tests**

      npm run accessibility:local

- **Running Cross Browser Tests**

      npm run functional-safari:ci
      npm run functional-firefox:ci

# Other useful commands

- **Running Prettier for Code Formatting**

      npm run format

- **Running Linting**

      npm run lint

- **Fix linting issues**

      npm run lint:fix

## Reports

After test execution, HTML reports are generated in:  
 `playwright-report/`

On CI, junit test results will also be available in results.xml

## Project Folder Structure

- `tests/`
  - `functional/`
    - `login/` — Login/logout workflows
    - `profile/` — Account/profile flows
    - `auth/` — Smart Login Set Up
  - `accessibility/` — WCAG/A11y checks
- `pages/` — POM abstractions
- `utils/` — Shared fixtures & helpers

## To do

Github Actions Integration

## Further Reading

For detailed testing strategy, coverage, and shift-left approach:

## **`TEST-APPROACH`**

```markdown
# Hudl Test Approach & Coverage

This document outlines the test strategy, shift-left approach, and coverage levels used in this project.

---

## Shift-Left Philosophy

While planning the test cases and scenarios, special consideration was given to the shift-left principles. With testing automation pyramid in mind, on purposely automation for functional/e2e tests were kept to minimum, focusing on user journeys, critical scenarios and state management.

It is assumed that, guidance on the testing automation pyramid is in place for the team, the component level interactions will be covered under unit/component/integration test levels i.e. rendering and interactions of text boxes, buttons on login pages will be thoroughly tested in lower layers in isolation, without requiring application deployment, using tools like React Testing Library (RTL) to test these components. Hence component level scenarios related to user interactions are not covered in e2e/functional automated tests.

---

## In Scope & Out of Scope for Automation

A separate high level overall test scenarios document is created in excel and will be shared separately, only relevant e2e tests are picked up from there and automated in this repo. The document covers expected coverage at lower levels of testing.

- The document will list all test scenarios for Login - including non functional.
- Each test scenario will have the details on the test level they belongs to, if they are in scope or out of scope for automation and what is the current status on the scenario.

---

## Test Levels & Responsibility

- **Unit / Integration Tests** → Handled in the product codebase (separate repos, by developers)
- **E2E Automation** → Maintained in this Playwright project.

---

## Tooling

- **Playwright** – Browser automation framework
- **axe-core** – Accessibility scanning
- **GitHub Actions** – CI/CD execution
- **ESLint** – Code quality and style checks
- **Husky** – Enforcing pre-commit checks

---

## Key Considerations and Implementations:

- **CI Integration for Early Feedback:** Automated tests to run on every PR to catch issues early.
- **Secrets Management:** No secrets to be stored in plain text within the codebase.
- **Linting & Code Quality:** Husky pre-commit hooks enforcing linting and code formatting using prettier, ensuring readable, maintainable, and high-quality code.
- **Smart Login:** Smart login to provide login state to tests by default during test setup. Authenticated state to be used to bypass repetitive UI login flows. This allows QEs to focus on testing relevant functionality rather than login itself. Separate UI tests for login features will exist as a separate project such as `functional-login-ui` to ensure, the login feature itself is testing adequately on its own.
- **Data-Driven Testing:** Positive and negative scenarios to share fixtures and test data to reduce duplication. Helper functions and abstractions enhance readability, maintainability, and enforce DRY principles.
- **Page Object Model (POM):** Using POM pattern, locators and page-level interactions to be stored separated from tests, making tests easier to maintain and understand.
- **Accessibility Checks:** WCAG compliance to be validated in CI using Playwright + axe-core. Failure only on Critical or Severe issues identification.
- **Cross-Browser Testing:** Testing via Chromium, Firefox, and WebKit.
- **Visual Evidence:** Screenshots, videos, and HTML reports retained for analysis.
- **Retry Strategy:** CI retries failures to reduce flakiness.
- **Security:** NPM audit to run in CI to proactively address vulnerabilities.

---

## Continuous Improvement

Future enhancements may include:

- Expanding accessibility coverage to all key flows
- Adding performance checks in CI
- Secret Scanning on pre-commit hook
- Integration with SonarQube
- Check for storageState expiry before skipping.

---
```
