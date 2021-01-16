import { checkForDuplicates } from './validate-name';
import { v4 as uuidv4 } from 'uuid';

describe('validate name util', () => {
  const firstId = uuidv4();
  const secondId = uuidv4();

  const firstSubjectName = uuidv4();
  const secondSubjectName = uuidv4();

  const subjects = [
    {
      firebaseId: '',
      id: firstId,
      subjectName: firstSubjectName,
      primaryColorId: uuidv4(),
      primaryColor: uuidv4(),
      secondaryColor: uuidv4(),
      iconId: uuidv4(),
    },
    {
      firebaseId: uuidv4(),
      id: secondId,
      subjectName: secondSubjectName,
      primaryColorId: uuidv4(),
      primaryColor: uuidv4(),
      secondaryColor: uuidv4(),
      iconId: uuidv4(),
    },
    {
      firebaseId: uuidv4(),
      id: uuidv4(),
      subjectName: 'subject-name',
      primaryColorId: uuidv4(),
      primaryColor: uuidv4(),
      secondaryColor: uuidv4(),
      iconId: uuidv4(),
    },
  ];

  it('should return true when finding duplicate', () => {
    const result = checkForDuplicates(subjects, 'subject-name');

    expect(result).toEqual(true);
  });

  it('should return false when no duplicates', () => {
    const result = checkForDuplicates(subjects, 'subjects');

    expect(result).toEqual(false);
  });
});
