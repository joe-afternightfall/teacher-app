export class SubjectDAO {
  id: string;
  subjectName: string;
  primaryColorId: string;
  primaryColor: string;
  secondaryColor: string;
  iconId: string;

  constructor(
    id: string,
    subjectName: string,
    primaryColorId: string,
    primaryColor: string,
    secondaryColor: string,
    iconId: string
  ) {
    this.id = id;
    this.subjectName = subjectName;
    this.primaryColorId = primaryColorId;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
    this.iconId = iconId;
  }
}
