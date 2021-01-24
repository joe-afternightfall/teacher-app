import { formatDate, formatDateWithout } from './date-formatter';

describe('date formatter', () => {
  it('should format date with am/pm', () => {
    const date = formatDate(new Date(12345678));

    expect(date).toEqual('9:25 PM');
  });

  it('should format date without', () => {
    const date = formatDateWithout(new Date(12345678));

    expect(date).toEqual('9:25');
  });
});
