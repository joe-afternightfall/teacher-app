import { v4 as uuidv4 } from 'uuid';
import { LessonItem } from '../models/LessonItem';
import { ColorChoice } from '../theme/subject-color-choices';
import { LessonPlanner } from '../models/LessonPlanner';
import { Subject } from '../models/Subject';
import { Bookmark } from '../models/Bookmark';
import { BookmarkDAO } from '../models/BookmarkDAO';
import { LessonPlannerDAO } from '../models/LessonPlannerDAO';
import { SubjectDAO } from '../models/SubjectDAO';

export const buildLessonItems = (items: number): LessonItem[] => {
  let index = 0;
  const builtList = [];

  while (index < items) {
    index += 1;

    const newLesson = new LessonItem(
      `test-id-${index}`,
      `test-content-${index}`,
      new Date(),
      new Date(),
      `subject-id-${index}`,
      `type-${index}`,
      `lesson-name-${index}`
    );

    builtList.push(newLesson);
  }

  return builtList;
};

export const buildLessonPlanner = (): LessonPlanner => {
  return {
    firebaseId: 'firebase-planner',
    updatedAt: new Date().toLocaleDateString(),
    id: 'planner-id',
    title: 'planner-title',
    weekNumber: 'week-number',
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
    });
  }

  return builtList;
};


export const buildSubjectDAOList = (amount: number): SubjectDAO[] => {
  let index = 0;
  const builtList = [];

  while (index < amount) {
    index += 1;

    builtList.push({
      id: `id-${index}`,
      subjectName: `subject-name-${index}`,
      primaryColorId: uuidv4(),
      primaryColor: uuidv4(),
      secondaryColor: uuidv4(),
      iconId: uuidv4(),
    });
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

export const buildBookmarkDAOList = (amount: number): BookmarkDAO[] => {
  let index = 0;
  const builtList = [];

  while (index < amount) {
    index += 1;

    builtList.push({
      id: uuidv4(),
      bookmarkUrl: uuidv4(),
      bookmarkTitle: uuidv4(),
      subjectId: uuidv4(),
      plannerItemIds: [uuidv4()],
    });
  }

  return builtList;
};

export const buildLessonPlannerDAOList = (amount: number): LessonPlannerDAO[] => {
  let index = 0;
  const builtList = [];

  while (index < amount) {
    index += 1;

    builtList.push({
      updatedAt: new Date().toLocaleDateString(),
      id: `planner-id-${ index }`,
      title: `planner-title-${ index }`,
      weekNumber: `week-number-${ index }`,
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
          id: `note-id-${ index }`,
          content: `note-content-${ index }`,
        },
        {
          id: `note-id-${ index }`,
          content: `note-content-${ index }`,
        },
      ],
    });
  }

  return builtList;
}