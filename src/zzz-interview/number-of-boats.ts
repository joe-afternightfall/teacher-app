
export function numRescueBoats(people: number[], limit: number): number {
  people.sort((n1, n2) => n1 - n2);

  let i = 0;
  let j = people.length - 1;
  let answer = 0;

  while (i <= j) {
    answer++;

    if (people[i] + people[j] <= limit) {
      i++;
    }
    j--;
  }
  return answer;
}