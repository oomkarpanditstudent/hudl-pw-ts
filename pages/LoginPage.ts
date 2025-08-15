import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly acceptCookiesBtn: Locator;
  readonly logInLink: Locator;
  readonly logInHudlLink: Locator;
  readonly logInEmailTxtBox: Locator;
  readonly continueBtn: Locator;
  readonly logInPasswordTxtBox: Locator;
  readonly loggedOnUserEmailId: Locator;
  readonly loggedOnUserMenu: Locator;
  readonly loggedInUserPanel: Locator;
  readonly logOutLink: Locator;
  readonly editEmailLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesBtn = page.getByRole('button', { name: 'Accept All Cookies' });
    this.logInLink = page.getByRole('link', { name: 'Log in' });
    this.logInHudlLink = page.getByTestId('login-hudl');
    this.logInEmailTxtBox = page.getByRole('textbox', { name: 'Email' });
    this.continueBtn = page.getByRole('button', { name: 'Continue', exact: true });
    this.logInPasswordTxtBox = page.getByRole('textbox', { name: 'Password' });
    this.loggedOnUserEmailId = page.locator('[class*="globaluseritem__email"]');
    this.loggedOnUserMenu = page.locator('[class*="globaluseritem__display"]');
    this.loggedInUserPanel = page.getByTestId('webnav-teamswitcher-menu');
    this.logOutLink = page.getByRole('link', { name: 'Log Out' });
    this.editEmailLink = page.getByRole('link', { name: 'Edit' });
  }

  async goToHomePage() {
    await this.page.goto('/');
    if (await this.acceptCookiesBtn.isVisible()) { //to be geolocation agnostic
      await this.acceptCookiesBtn.click();
    }
  }

  async login(email: string, password: string) {
    await this.logInLink.click();
    await this.logInHudlLink.click();
    await this.logInEmailTxtBox.fill(email);
    await this.continueBtn.click();
    await this.logInPasswordTxtBox.fill(password);
    await this.continueBtn.click();
  }

  async logout() {
    await this.loggedOnUserMenu.hover();
    await this.logOutLink.click();
  }

  async assertUserIsLoggedIn() {
    await this.loggedOnUserMenu.hover();
    await expect(this.loggedOnUserEmailId).toBeVisible();
    await expect(this.loggedInUserPanel).toBeVisible();
  }

  async assertUserIsLoggedOut() {
    await expect(this.logInLink).toBeVisible();
  }

  async assertLoginErrorVisible(message: string) {
    await expect(this.page.getByText(message, { exact: false })).toBeVisible();
  }
}
