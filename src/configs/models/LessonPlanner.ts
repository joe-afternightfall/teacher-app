import { LessonPlannerDAO } from './LessonPlannerDAO';
import { LessonNote, Weekday } from '../types/LessonPlanner';

export class LessonPlanner extends LessonPlannerDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    updatedAt: string,
    id: string,
    title: string,
    weekdays: {
      [key: string]: Weekday;
    },
    notes: LessonNote[]
  ) {
    super(updatedAt, id, title, weekdays, notes);

    this.firebaseId = firebaseId;
  }
}
