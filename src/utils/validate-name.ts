import { Subject } from '../configs/types/Subject';

export const checkForDuplicates = (
  subjectList: Subject[],
  newSubject: string
): boolean => {
  return subjectList.some(
    (subject: Subject) => subject.subjectName === newSubject
  );
};
