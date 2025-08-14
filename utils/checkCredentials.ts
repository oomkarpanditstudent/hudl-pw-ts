const USER_EMAIL = process.env.USER_EMAIL ?? '';
const USER_PASSWORD = process.env.USER_PASSWORD ?? '';
const WRONG_PASSWORD = process.env.WRONG_PASSWORD ?? '*';
//Keeping all secrets out of code, even fake ones.

if (!USER_EMAIL || !USER_PASSWORD) {
  throw new Error('USER_EMAIL and USER_PASSWORD must be set');
}

export { USER_EMAIL, USER_PASSWORD, WRONG_PASSWORD };
