import { capitalizeFirstLetter } from "./string-formatter";

describe('string formatter util', () => {
  it('should capitalize first char', () => {
    const result = capitalizeFirstLetter('testing');

    expect(result).toBe('Testing');
  });
});
