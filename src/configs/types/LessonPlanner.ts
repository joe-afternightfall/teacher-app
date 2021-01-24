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

export interface WeekDay {
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
    [key: string]: WeekDay;
  };
  notes: LessonNote[];
}

export interface LessonItems {
  [key: string]: string | LessonItem[] | WeekDay;
  monday: LessonItem[];
  tuesday: LessonItem[];
  wednesday: LessonItem[];
  thursday: LessonItem[];
  friday: LessonItem[];
}
