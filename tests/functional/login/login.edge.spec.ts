import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import {
  USER_EMAIL as registeredEmail,
  USER_PASSWORD as registeredPassword,
  WRONG_PASSWORD,
} from '../../../utils/checkCredentials';

test.describe('Edge case: login state transitions', () => {
  const nonRegisteredEmail = 'user@typo.com';
  const wrongPassword = WRONG_PASSWORD;
  const errorMsgEmailTypo = 'Incorrect username or password.';
  const errorMsgPwdTypo = 'Your email or password is incorrect. Try again.';

  test('Coach can fix an email typo and log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToHomePage();

    // Attempt login with typo
    await loginPage.login(nonRegisteredEmail, registeredPassword);
    await loginPage.assertLoginErrorVisible(errorMsgEmailTypo);

    // Switch email to correct one
    await loginPage.editEmailLink.click();
    await loginPage.logInEmailTxtBox.clear();
    await loginPage.logInEmailTxtBox.fill(registeredEmail);

    // Enter password and log in
    await loginPage.continueBtn.click();
    await loginPage.logInPasswordTxtBox.fill(registeredPassword);
    await loginPage.continueBtn.click();

    // Verify successful login
    await loginPage.assertUserIsLoggedIn();
  });

  test('Coach can correct invalid password after failed login attempt', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToHomePage();

    // Attempt login with wrong password
    await loginPage.login(registeredEmail, wrongPassword);
    await loginPage.assertLoginErrorVisible(errorMsgPwdTypo);

    // Enter correct password and login
    await loginPage.logInPasswordTxtBox.clear();
    await loginPage.logInPasswordTxtBox.fill(registeredPassword);
    await loginPage.continueBtn.click();
    await loginPage.assertUserIsLoggedIn();
  });
});
