import { numRescueBoats } from './number-of-boats';

describe('number of boats', () => {
  it('should return 3 boats', () => {
    const boats = numRescueBoats([3,2,2,1], 3);

    expect(boats).toEqual(3);
  });

  it('should return 1 boat', () => {
    const boats = numRescueBoats([1,2], 3);

    expect(boats).toEqual(1);
  });

  it('should return 4 boat', () => {
    const boats = numRescueBoats([3,5,3,4], 5);

    expect(boats).toEqual(4);
  });
});