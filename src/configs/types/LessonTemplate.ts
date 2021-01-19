import { WeekDay } from "./LessonPlanner";

export interface LessonTemplate {
  createdAt: string;
  id: string;
  title: string;
  weekdays: {
    [key: string]: WeekDay;
  }
}