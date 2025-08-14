import { test } from '../../utils/accessibility';
import { checkAccessibilityViolations } from '../../utils/checkAccessibilityViolations';
import { LoginPage } from '../../pages/LoginPage';

test('Accessibility test home page without a user logged in', async ({ page, makeAxeBuilder }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToHomePage();
  await page.waitForLoadState('load');
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  checkAccessibilityViolations(accessibilityScanResults.violations);
});
