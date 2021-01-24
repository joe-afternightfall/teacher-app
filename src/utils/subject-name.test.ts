import { getSubject, getSubjectName } from './subject-name';
import { buildSubjectList } from '../configs/test-utils/test-util';

describe('getting subject name', () => {
  const subjectList = buildSubjectList();

  it('should return subject name', () => {
    const foundSubjectName = getSubjectName(subjectList, 'first-id');

    expect(foundSubjectName).toEqual('first-subject-name');
  });

  it('should return second subject', () => {
    const foundSubjectName = getSubjectName(subjectList, 'second-id');

    expect(foundSubjectName).toEqual('second-subject-name');
  });

  it('should return null', () => {
    const subjectName = getSubjectName(subjectList, 'test-id');

    expect(subjectName).toEqual(undefined);
  });

  it('should return found subject', () => {
    const subject = getSubject(subjectList, 'second-id');

    expect(subject).toEqual(subjectList[1]);
  });

  it('should return undefined', () => {
    const subject = getSubject(subjectList, 'dummy-id');

    expect(subject).toEqual(undefined);
  });
});
