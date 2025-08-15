import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const storageStatePath = path.resolve(__dirname, '.storageState.json');

export default defineConfig({
  timeout: 60_000,
  expect: { timeout: 15_000 },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [
        ['junit', { outputFile: 'results.xml' }],
        ['html', { open: 'never' }],
      ]
    : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'https://www.hudl.com',
    testIdAttribute: 'data-qa-id',
    screenshot: 'on',
    video: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup', // To enable smart login and avoiding having to log in each time via UI
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: 'accessibility',
      testDir: 'tests/accessibility',
      use: { ...devices['Desktop Chrome'] },
    },
    // Functional tests that use UI flow authentication
    {
      name: 'functional-login-ui',
      testDir: 'tests/functional/login',
      use: { ...devices['Desktop Chrome'] },
    },
    // Functional tests that use Smart Login - non UI authentication
    {
      name: 'functional',
      testMatch: ['tests/functional/!(*login)/**/*.spec.ts'], // everything except login folder
      use: {
        ...devices['Desktop Chrome'],
        storageState: storageStatePath,
      },
      dependencies: ['setup'],
    },
    {
      name: 'functional-firefox', //for cross browser testing
      testMatch: ['tests/functional/!(*login)/**/*.spec.ts'],
      use: { ...devices['Desktop Firefox'], storageState: storageStatePath },
      dependencies: ['setup'],
    },
    {
      name: 'functional-webkit', //for cross browser testing
      testMatch: ['tests/functional/!(*login)/**/*.spec.ts'],
      use: { ...devices['Desktop Safari'], storageState: storageStatePath },
      dependencies: ['setup'],
    },
  ],
});
