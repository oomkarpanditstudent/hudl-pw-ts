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

## Further Reading

For detailed testing strategy, coverage, and shift-left approach, see:
[TEST-APPROACH.md](./TEST-APPROACH.md)