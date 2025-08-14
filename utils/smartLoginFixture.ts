import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type SmartLoginFixtures = {
  smartLogin: LoginPage;
};

export const test = base.extend<SmartLoginFixtures>({
  smartLogin: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect };
