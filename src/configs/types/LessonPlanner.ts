export interface LessonItem {
  [key: string]: string | Date;
  id: string;
  content: string;
  startTime: Date;
  endTime: Date;
  subjectId: string;
}

export interface LessonNote {
  id: string;
  content: string;
}

export interface Weekday {
  date: string;
  items: LessonItem[];
}

export interface MoveLessonResult {
  [key: string]: LessonItem[];
}

export interface LessonPlanner {
  firebaseId: string;
  updatedAt: Date;
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  weekdays: {
    [key: string]: Weekday;
  };
  notes: LessonNote[];
}

export interface LessonWeekdays {
  [key: string]: string | LessonItem[] | Weekday;
  monday: LessonItem[];
  tuesday: LessonItem[];
  wednesday: LessonItem[];
  thursday: LessonItem[];
  friday: LessonItem[];
}
