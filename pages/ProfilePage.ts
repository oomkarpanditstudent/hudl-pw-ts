import { type Page, type Locator, expect } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly editProfileBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editProfileBtn = page.locator('#editProfileImage');
  }

  async goToProfilePage() {
    await this.page.goto('/profile');
    await this.page.waitForLoadState('networkidle');
  }

  async assertProfileIsAvailable() {
    await expect(this.editProfileBtn).toBeVisible();
  }
}
