import { LessonNote, Weekday } from '../types/LessonPlanner';

export class LessonPlannerDAO {
  updatedAt: string;
  id: string;
  title: string;
  weekNumber: string;
  weekdays: {
    [key: string]: Weekday;
  };
  notes: LessonNote[];

  constructor(
    updatedAt: string,
    id: string,
    title: string,
    weekNumber: string,
    weekdays: {
      [key: string]: Weekday;
    },
    notes: LessonNote[]
  ) {
    this.updatedAt = updatedAt;
    this.id = id;
    this.title = title;
    this.weekNumber = weekNumber;
    this.weekdays = weekdays;
    this.notes = notes;
  }
}
