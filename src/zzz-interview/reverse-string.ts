export const reverseWords = (word: string): string => {
  return word.split(' ').map((newWord) => {
    return newWord.split('').reverse().join('');
  }).join(' ');
}