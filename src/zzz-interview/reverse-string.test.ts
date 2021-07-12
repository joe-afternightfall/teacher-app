import { reverseWords } from './reverse-string';

describe('reverse string', () => {
  it('should reverse sentence', () => {
    const response = reverseWords('Let\'s take LeetCode contest');

    expect(response).toEqual('s\'teL ekat edoCteeL tsetnoc');
  });

  it('should return phrase', () => {
    const response = reverseWords('God Ding');

    expect(response).toEqual('doG gniD');
  });
});