import { LessonItem, LessonPlanner } from '../types/LessonPlanner';
import { Subject } from '../types/Subject';
import { v4 as uuidv4 } from 'uuid';
import { ColorChoice } from '../theme/subject-color-choices';
import { Bookmark } from '../types/Bookmark';

export const buildLessonItems = (items: number): LessonItem[] => {
  let index = 0;
  const builtList = [];

  while (index < items) {
    index += 1;

    builtList.push({
      id: `test-id-${index}`,
      content: `test-content-${index}`,
      startTime: new Date(),
      endTime: new Date(),
      subjectId: `subject-id-${index}`,
    });
  }

  return builtList;
};

export const buildLessonPlanner = (): LessonPlanner => {
  return {
    firebaseId: 'firebase-planner',
    updatedAt: new Date(),
    id: 'planner-id',
    startDate: new Date(),
    endDate: new Date(),
    title: 'planner-title',
    weekdays: {
      monday: {
        date: '01/01/2021',
        items: buildLessonItems(3),
      },
      wednesday: {
        date: '01/03/2021',
        items: buildLessonItems(2),
      },
      thursday: {
        date: '01/04/2021',
        items: buildLessonItems(1),
      },
      friday: {
        date: '01/05/2021',
        items: buildLessonItems(2),
      },
    },
    notes: [
      {
        id: 'note-id-one',
        content: 'note-content-one',
      },
      {
        id: 'note-id-two',
        content: 'note-content-two',
      },
    ],
  };
};

export const buildSubjectList = (amount: number): Subject[] => {
  let index = 0;
  const builtList = [];

  while (index < amount) {
    index += 1;

    builtList.push({
      firebaseId: uuidv4(),
      id: `id-${index}`,
      subjectName: `subject-name-${index}`,
      primaryColorId: uuidv4(),
      primaryColor: uuidv4(),
      secondaryColor: uuidv4(),
      iconId: uuidv4(),
    },)
  }

  return builtList;
};

// todo:  make dynamic by taking in number
export const buildColor = (): ColorChoice => {
  return {
    id: 'color-id',
    name: 'test-name',
    primaryColor: 'primary',
    secondaryColor: 'secondary',
  };
};

export const buildBookmarkList = (amount: number): Bookmark[] => {
  let index = 0;
  const builtList = [];

  while (index < amount) {
    index += 1;

    builtList.push({
      firebaseId: uuidv4(),
      id: uuidv4(),
      bookmarkUrl: uuidv4(),
      bookmarkTitle: uuidv4(),
      subjectId: uuidv4(),
      plannerItemIds: [uuidv4()],
    });
  }

  return builtList;
};
