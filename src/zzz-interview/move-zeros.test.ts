import { moveZeros } from './move-zeros';

describe('move zeros function', () => {
  it('should return ordered numbers with zeros at the end', () => {
    let numbers = moveZeros([0,1,0,3,12]);

    expect(numbers).toEqual([1,3,12,0,0]);
  });

  it('should return ordered numbers', () => {
    let numbers = moveZeros([0,1,0,3,0,7,0,11,0,0,12,41,0,99]);

    expect(numbers).toEqual([1,3,7,11,12,41,99,0,0,0,0,0,0,0]);
  });
});