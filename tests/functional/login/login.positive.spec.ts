import { test } from '../../../utils/loginAsCoachFixture';

// Happy paths with Login fixture to log in via UI before each test

test.describe('Positive login tests', () => {
  test('Coach can log in successfully with valid credentials', async ({ loginAsCoach }) => {
    await loginAsCoach.assertUserIsLoggedIn();
  });

  test('Coach can logout successfully with valid credentials', async ({ loginAsCoach }) => {
    await loginAsCoach.logout();
    await loginAsCoach.assertUserIsLoggedOut();
  });
});
