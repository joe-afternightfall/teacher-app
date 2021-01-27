import { LessonPlannerDAO } from './LessonPlannerDAO';
import { LessonNote, Weekday } from '../types/LessonPlanner';

export class LessonPlanner extends LessonPlannerDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
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
    super(updatedAt, id, title, startDate, endDate, weekdays, notes);

    this.firebaseId = firebaseId;
  }
}
