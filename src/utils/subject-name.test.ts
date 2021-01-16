import { getSubjectName } from "./subject-name";
import { v4 as uuidv4 } from 'uuid';

describe('getting subject name', () => {
  const firstId = uuidv4();
  const secondId = uuidv4();

  const firstSubjectName = uuidv4();
  const secondSubjectName = uuidv4();

  const subjects = [{
    firebaseId: '',
    id: firstId,
    subjectName: firstSubjectName,
    primaryColorId: uuidv4(),
    primaryColor: uuidv4(),
    secondaryColor: uuidv4(),
    iconId: uuidv4(),
  },{
    firebaseId: uuidv4(),
    id: secondId,
    subjectName: secondSubjectName,
    primaryColorId: uuidv4(),
    primaryColor: uuidv4(),
    secondaryColor: uuidv4(),
    iconId: uuidv4(),
  },{
    firebaseId: uuidv4(),
    id: uuidv4(),
    subjectName: 'subject-name',
    primaryColorId: uuidv4(),
    primaryColor: uuidv4(),
    secondaryColor: uuidv4(),
    iconId: uuidv4(),
  }]

  it('should return subject name', () => {
    const foundSubjectName = getSubjectName(subjects, firstId);

    expect(foundSubjectName).toEqual(firstSubjectName);
  });

  it('should return second subject', () => {
    const foundSubjectName = getSubjectName(subjects, secondId);

    expect(foundSubjectName).toEqual(secondSubjectName);
  });
});