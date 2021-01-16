import { Subject } from '../configs/types/Subject';

export const getSubjectName = (
  subjectList: Subject[],
  subjectId: string
): string | undefined => {
  const found = subjectList.find((subject: Subject) => {
    return subject.id === subjectId;
  });

  return found && found.subjectName;
};
