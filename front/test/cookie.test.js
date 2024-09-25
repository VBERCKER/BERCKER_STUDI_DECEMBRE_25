import { getCookie, setCookie } from '../src/composants/securite_cookies_token_auth_localstorage/cookies'; 
import '@testing-library/jest-dom';


describe('cookies', () => {
  it('sets a cookie with the given name, value, and expiration date', () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const expectedCookie = `test=hello; expires=${date.toUTCString()};`;

    setCookie('test', 'hello', 1);

    expect(document.cookie).toContain(expectedCookie);
  });

  it('gets the value of a cookie with the given name', () => {
    document.cookie = 'test=hello;';

    const value = getCookie('test');

    expect(value).toBe('hello');
  });

  it('returns null if no cookie with the given name exists', () => {
    document.cookie = '';

    const value = getCookie('test');

    expect(value).toBeNull();
  });
});