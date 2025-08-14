import { test } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { LoginPage } from '../../pages/LoginPage';
import { USER_EMAIL, USER_PASSWORD } from '../../utils/checkCredentials';

const storageStatePath = path.resolve(__dirname, '../../.storageState.json');

test('Login and save storage state', async ({ page }) => {
  // Skip creating storageState.json if it already exists

  if (fs.existsSync(storageStatePath)) {
    console.log('storageState.json exists, skipping setup');
    return;
  }

  const loginPage = new LoginPage(page);
  await loginPage.goToHomePage();
  await loginPage.login(USER_EMAIL, USER_PASSWORD);
  await loginPage.assertUserIsLoggedIn();

  await page.context().storageState({ path: storageStatePath });
});
