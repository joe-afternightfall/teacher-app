import { LessonPlanner } from '../configs/models/LessonPlanner';
import { LessonWeekdays } from '../configs/types/LessonPlanner';

export const updateWeekdays = (
  planner: LessonPlanner,
  days: LessonWeekdays
): LessonPlanner => {
  const newPlanner = planner;

  newPlanner.weekdays.monday.items = days.monday;
  newPlanner.weekdays.tuesday.items = days.tuesday;
  newPlanner.weekdays.wednesday.items = days.wednesday;
  newPlanner.weekdays.thursday.items = days.thursday;
  newPlanner.weekdays.friday.items = days.friday;

  return newPlanner;
};
