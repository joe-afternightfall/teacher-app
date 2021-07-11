import { LessonItem } from '../models/LessonItem';
import { ColorChoice } from '../theme/subject-color-choices';
import { LessonPlanner } from '../models/LessonPlanner';
import { Subject } from '../models/Subject';
import { Bookmark } from '../models/Bookmark';
import { BookmarkDAO } from '../models/BookmarkDAO';
import { LessonPlannerDAO } from '../models/LessonPlannerDAO';
import { SubjectDAO } from '../models/SubjectDAO';
import { chance } from 'jest-chance';
import { LibraryBook } from '../models/LibraryBook';

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

export const buildLessonPlanners = (amount: number): LessonPlanner[] => {
  let index = 0;
  const builtList = [];

  while (index < amount) {
    index += 1;

    const monDate = new Date().setDate(index);
    const tuesDate = new Date().setDate(index + 1);
    const wedDate = new Date().setDate(index + 2);
    const thursDate = new Date().setDate(index + 3);
    const friDate = new Date().setDate(index + 4);

    builtList.push({
      firebaseId: `firebase-planner-${index}`,
      updatedAt: new Date().toLocaleDateString(),
      id: `planner-id-${index}`,
      title: `planner-title-${index}`,
      weekNumber: `week-number-${index}`,
      weekdays: {
        monday: {
          date: monDate.toLocaleString(),
          items: buildLessonItems(3),
        },
        tuesday: {
          date: tuesDate.toLocaleString(),
          items: buildLessonItems(4),
        },
        wednesday: {
          date: wedDate.toLocaleString(),
          items: buildLessonItems(2),
        },
        thursday: {
          date: thursDate.toLocaleString(),
          items: buildLessonItems(1),
        },
        friday: {
          date: friDate.toLocaleString(),
          items: buildLessonItems(2),
        },
      },
      notes: [
        {
          id: `note-id-${index}`,
          content: `note-content-${index}`,
        },
        {
          id: `note-id-${index}`,
          content: `note-content-${index}`,
        },
      ],
    });
  }

  return builtList;
};

export const buildSubjectList = (amount: number): Subject[] => {
  let index = 0;
  const builtList = [];

  while (index < amount) {
    index += 1;

    builtList.push({
      firebaseId: chance.string(),
      id: `id-${index}`,
      subjectName: `subject-name-${index}`,
      primaryColorId: chance.string(),
      primaryColor: chance.string(),
      secondaryColor: chance.string(),
      iconId: chance.string(),
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
      primaryColorId: chance.string(),
      primaryColor: chance.string(),
      secondaryColor: chance.string(),
      iconId: chance.string(),
    });
  }

  return builtList;
};

export const buildColor = (amount: number): ColorChoice[] => {
  let index = 0;
  const builtList = [];

  while (index < amount) {
    index += 1;

    builtList.push({
      id: `color-id-${index}`,
      name: `test-name-${index}`,
      primaryColor: `primary-${index}`,
      secondaryColor: `secondary-${index}`,
    });
  }

  return builtList;
};

export const buildBookmarkList = (amount: number): Bookmark[] => {
  let index = 0;
  const builtList = [];

  while (index < amount) {
    index += 1;

    builtList.push({
      firebaseId: chance.string(),
      id: chance.string(),
      bookmarkUrl: chance.string(),
      bookmarkTitle: chance.string(),
      subjectId: chance.string(),
      plannerItemIds: [chance.string()],
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
      id: chance.string(),
      bookmarkUrl: chance.string(),
      bookmarkTitle: chance.string(),
      subjectId: chance.string(),
      plannerItemIds: [chance.string()],
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
        tuesday: {
          date: '01/02/2021',
          items: buildLessonItems(2),
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

export const buildLibraryBook = (): LibraryBook => {
  return new LibraryBook(
    chance.string(),
    chance.string(),
    chance.string(),
    chance.string(),
    chance.string(),
    chance.integer(),
    chance.integer(),
    chance.integer(),
  )
}

export const buildLibraryBooksList = (amount: number): LibraryBook[] => {
  let index = 0;
  const builtList = [];

  while (index < amount) {
    index += 1;
    builtList.push(buildLibraryBook());
  }

  return builtList;
}
