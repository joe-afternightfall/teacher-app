import { SubjectDAO } from './SubjectDAO';

export class Subject extends SubjectDAO {
  firebaseId: string;
  [key: string]: string;

  constructor(
    firebaseId: string,
    id: string,
    subjectName: string,
    primaryColorId: string,
    primaryColor: string,
    secondaryColor: string,
    iconId: string
  ) {
    super(
      id,
      subjectName,
      primaryColorId,
      primaryColor,
      secondaryColor,
      iconId
    );

    this.firebaseId = firebaseId;
  }
}
