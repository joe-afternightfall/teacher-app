import { LessonPlanner } from '../configs/types/LessonPlanner';
import { v4 as uuidv4 } from 'uuid';

export const buildDefaultTemplate = (): LessonPlanner => {
  return {
    firebaseId: '',
    updatedAt: new Date(),
    id: uuidv4(),
    title: 'Template Builder',
    weekdays: {
      monday: {
        date: '',
        items: [],
      },
      tuesday: {
        date: '',
        items: [],
      },
      wednesday: {
        date: '',
        items: [],
      },
      thursday: {
        date: '',
        items: [],
      },
      friday: {
        date: '',
        items: [],
      },
    },
    notes: [],
  };
};
