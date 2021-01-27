export class LessonItem {
  [key: string]: string | Date | undefined;

  id: string;
  content: string;
  startTime: Date;
  endTime: Date;
  subjectId: string;
  type: string | undefined;
  otherLessonTypeName: string;

  constructor(
    id: string,
    content: string,
    startTime: Date,
    endTime: Date,
    subjectId: string,
    type: string | undefined,
    otherLessonTypeName: string
  ) {
    this.id = id;
    this.content = content;
    this.startTime = startTime;
    this.endTime = endTime;
    this.subjectId = subjectId ? subjectId : '';
    this.type = type;
    this.otherLessonTypeName = otherLessonTypeName ? otherLessonTypeName : '';
  }
}
