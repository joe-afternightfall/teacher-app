import { LessonNote, Weekday } from '../types/LessonPlanner';

export class LessonPlannerDAO {
  updatedAt: string;
  id: string;
  title: string;
  weekdays: {
    [key: string]: Weekday;
  };
  notes: LessonNote[];

  constructor(
    updatedAt: string,
    id: string,
    title: string,
    weekdays: {
      [key: string]: Weekday;
    },
    notes: LessonNote[]
  ) {
    this.updatedAt = updatedAt;
    this.id = id;
    this.title = title;
    this.weekdays = weekdays;
    this.notes = notes;
  }
}
