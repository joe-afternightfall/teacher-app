import { LessonNote, Weekday } from '../types/LessonPlanner';

export class LessonPlanner {
  firebaseId: string;
  updatedAt: Date;
  id: string;
  title: string;
  weekdays: {
    [key: string]: Weekday;
  };
  notes: LessonNote[];

  constructor(
    firebaseId: string,
    updatedAt: Date,
    id: string,
    title: string,
    weekdays: {
      [key: string]: Weekday;
    },
    notes: LessonNote[]
  ) {
    this.firebaseId = firebaseId;
    this.updatedAt = updatedAt;
    this.id = id;
    this.title = title;
    this.weekdays = weekdays;
    this.notes = notes;
  }
}
