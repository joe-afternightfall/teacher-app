/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
export function findJudge(n: number, trust: number[][]): number {
  // town judge must have an outdegree of 0
  // town judge must have an indegree of (n - 1)

  if (trust.length < (n - 1)) {
    return -1;
  }

  let trustScores: number[] = [];

  for (let i = 1; i <= n; i++) {
    trustScores[i] = 0;
  }

  trust.forEach((relation: number[]) => {
    trustScores[relation[0]]--;
    trustScores[relation[1]]++;
  });

  for (let i = 1; i <= n; i++) {
    if (trustScores[i] === (n - 1)) {
      return i;
    }
  }
  return -1;
}