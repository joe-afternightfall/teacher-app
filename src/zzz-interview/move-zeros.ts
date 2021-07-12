
export const moveZeros = (numberList: number[]) => {
  let count = 0;

  for (let i = 0; i < numberList.length; i++) {
    if (numberList[i] !== 0) {
      numberList[count] = numberList[i];
      count++;
    }
  }

  for (let i = count; i < numberList.length; i++) {
    numberList[i] = 0;
  }

  return numberList;
}