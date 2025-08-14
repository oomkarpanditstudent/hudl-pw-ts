import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type LoginCoachFixtures = {
  loginAsCoach: LoginPage;
};

export const test = base.extend<LoginCoachFixtures>({
  loginAsCoach: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToHomePage();
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await loginPage.assertUserIsLoggedIn();
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
