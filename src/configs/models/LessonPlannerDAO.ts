import { LessonNote, Weekday } from '../types/LessonPlanner';

export class LessonPlannerDAO {
  updatedAt: Date;
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  weekdays: {
    [key: string]: Weekday;
  };
  notes: LessonNote[];

  constructor(
    updatedAt: Date,
    id: string,
    title: string,
    startDate: Date,
    endDate: Date,
    weekdays: {
      [key: string]: Weekday;
    },
    notes: LessonNote[]
  ) {
    this.updatedAt = updatedAt;
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.weekdays = weekdays;
    this.notes = notes;
  }
}
