import { test } from '../../utils/accessibility';
import { checkAccessibilityViolations } from '../../utils/checkAccessibilityViolations';
import { LoginPage } from '../../pages/LoginPage';

test('Accessibility test home page for a logged in user', async ({ page, makeAxeBuilder }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToHomePage();
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await loginPage.assertUserIsLoggedIn();
  await page.waitForLoadState('load');
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  checkAccessibilityViolations(accessibilityScanResults.violations);
});
