export interface LessonItem {
  id: string;
  content: string;
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

export interface Lesson {
  createdAt: string;
  id: string;
  title: string;
  items: {
    [key: string]: WeekDay;
  };
  notes: LessonNote[];
}

export interface LessonItems {
  monday: LessonItem[];
  tuesday: LessonItem[];
  wednesday: LessonItem[];
  thursday: LessonItem[];
  friday: LessonItem[];
}
