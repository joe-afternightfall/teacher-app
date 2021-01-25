import { getSubject, getSubjectName } from './subject-name';
import { buildSubjectList } from '../configs/test-utils/test-util';

describe('getting subject name', () => {
  const subjectList = buildSubjectList(3);

  it('should return subject name', () => {
    const foundSubjectName = getSubjectName(subjectList, 'id-3');

    expect(foundSubjectName).toEqual('subject-name-3');
  });

  it('should return second subject', () => {
    const foundSubjectName = getSubjectName(subjectList, 'id-1');

    expect(foundSubjectName).toEqual('subject-name-1');
  });

  it('should return undefined', () => {
    const undefinedObject = getSubjectName(subjectList, 'blah');

    expect(undefinedObject).toEqual(undefined);
  });

  it('should return null', () => {
    const subjectName = getSubjectName(subjectList, 'test-id');

    expect(subjectName).toEqual(undefined);
  });

  it('should return found subject', () => {
    const subject = getSubject(subjectList, 'id-1');

    expect(subject).toEqual(subjectList[0]);
  });

  it('should return undefined', () => {
    const subject = getSubject(subjectList, 'dummy-id');

    expect(subject).toEqual(undefined);
  });
});
