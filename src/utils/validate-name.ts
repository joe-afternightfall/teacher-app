import { Subject } from '../configs/models/Subject';

export const checkForDuplicates = (
  subjectList: Subject[],
  newSubject: string
): boolean => {
  return (
    subjectList &&
    subjectList.some((subject: Subject) => subject.subjectName === newSubject)
  );
};
