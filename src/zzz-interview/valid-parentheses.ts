/**
 * @param {string} s
 * @return {boolean}
 */
export const isValid = function(s: string): boolean {
  if (s === null || s.length <= 0) {
    return true
  }

  let eachCharacter = s.split('');
  let stack = [];

  for (let c of eachCharacter) {
    if (c === '[') {
      stack.push(']');
    } else if (c === '{') {
      stack.push('}');
    } else if (c === '(') {
      stack.push(')');
    } else if (stack.length === 0 || c !== stack.pop()) {
      return false;
    }
  }

  return stack.length === 0;
};