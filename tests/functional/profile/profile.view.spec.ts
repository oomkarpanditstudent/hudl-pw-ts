//Demo of Smart login test (fast, already authenticated)
import { test } from '../../../utils/smartLoginFixture';
import { ProfilePage } from '../../../pages/ProfilePage';

//Demo:This test is using a SMART LOGIN fixture where the login via UI is avoided to save time/reduce potential flakiness with UI driven login,
//instead session storage is created once and reused.

test('Coach can view the profile/account settings, also this is to demo smart login', async ({
  page,
}) => {
  const profilePage = new ProfilePage(page);
  await profilePage.goToProfilePage();
  await profilePage.assertProfileIsAvailable();
});
