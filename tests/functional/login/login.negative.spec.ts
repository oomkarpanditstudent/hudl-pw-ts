import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { USER_EMAIL as registeredEmail, WRONG_PASSWORD } from '../../../utils/checkCredentials';

// Negative login/authentication tests.
// Verifies that users cannot log in with invalid credentials
//and that the correct error message is displayed.

const scenarios = [
  {
    email: 'invalid2@example.com',
    password: WRONG_PASSWORD,
    reason: 'Email not signed up',
    message: 'Incorrect username or password',
  },
  {
    email: registeredEmail,
    password: WRONG_PASSWORD,
    reason: 'Incorrect password',
    message: 'Your email or password is incorrect. Try again.',
  },
];

test.describe('Negative login tests', () => {
  scenarios.forEach(({ email, password, reason, message }) => {
    test(`Cannot login with invalid credentials - ${reason}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goToHomePage();
      await loginPage.login(email, password);
      await loginPage.assertLoginErrorVisible(message);
    });
  });
});
