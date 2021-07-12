import { findJudge } from './find-judge';

describe('find judge test', () => {
  it('should hand back 3 as the judge', () => {
    const trust = [[1,3], [2,3], [4,3], [4,1], [5,3], [5,1], [5,4]]
    const found = findJudge(5, trust);

    console.log(found);
    expect(found).toEqual(3);
  });

  it('should hand back -1', () => {
    const trust = [[2,1],[3,1],[4,2],[4,3],[4,5],[5,1]]
    const found = findJudge(6, trust);

    console.log(found);
    expect(found).toEqual(-1);
  });
});