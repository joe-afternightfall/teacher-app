import { LessonPlannerDAO } from './LessonPlannerDAO';
import { LessonNote, Weekday } from '../types/LessonPlanner';

export class LessonPlanner extends LessonPlannerDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    updatedAt: string,
    id: string,
    title: string,
    weekNumber: string,
    weekdays: {
      [key: string]: Weekday;
    },
    notes: LessonNote[]
  ) {
    super(updatedAt, id, title, weekNumber, weekdays, notes);

    this.firebaseId = firebaseId;
  }
}
