import { isValid } from './valid-parentheses';

describe('valid parentheses method', () => {
  it('should return true', () => {
    const response = isValid('()[]{}');

    expect(response).toEqual(true);
  });

  it('should return false', () => {
    const response = isValid('(}');

    expect(response).toEqual(false);
  });
});