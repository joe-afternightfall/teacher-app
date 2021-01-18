import { Subject } from '../configs/types/Subject';

export const checkForDuplicates = (
  subjectList: Subject[],
  newSubject: string
): boolean => {
  return (
    subjectList &&
    subjectList.some((subject: Subject) => subject.subjectName === newSubject)
  );
};
