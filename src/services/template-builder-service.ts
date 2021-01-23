import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { buildDefaultTemplate } from '../utils/template-builder';
import { LessonItem } from '../configs/types/LessonPlanner';

const allWeekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export const saveNewTemplate = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const plannerState = getState().lessonPlannerState;
  const templateRef = firebase.database().ref('/template-builder');
  const newTemplateRef = templateRef.push();
  const allDaysSelected = plannerState.allDaysSelected;
  let builtItems;

  if (allDaysSelected) {
    builtItems = allWeekdays.reduce((obj: any, day: string) => {
      obj[day] = {
        date: '',
        items: [
          {
            id: uuidv4(),
            content: '',
            startTime: plannerState.startTime.toISOString(),
            endTime: plannerState.endTime.toISOString(),
            startDate: plannerState.startDate.toLocaleDateString(),
            endDate: plannerState.endDate.toLocaleDateString(),
            subjectId: plannerState.lessonSubjectId,
          },
        ],
      };
      return obj;
    }, {});
  } else {
    builtItems = plannerState.selectedDays.reduce((obj: any, day: string) => {
      obj[day] = {
        date: '',
        items: [
          {
            id: uuidv4(),
            content: '',
            startTime: plannerState.startTime.toISOString(),
            endTime: plannerState.endTime.toISOString(),
            startDate: plannerState.startDate.toLocaleDateString(),
            endDate: plannerState.endDate.toLocaleDateString(),
            subjectId: plannerState.lessonSubjectId,
          },
        ],
      };
      return obj;
    }, {});
  }

  const itemToSave = {
    updatedAt: new Date(),
    id: uuidv4(),
    title: 'asdfasdflkj',
    weekdays: builtItems,
  };

  return await newTemplateRef.set(itemToSave, (error) => {
    if (error) {
      // dispatch error
    } else {
      // dispatch success
    }
  });
};

export const editTemplate = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const plannerState = getState().lessonPlannerState;

  const startTime = plannerState.startTime;
  const endTime = plannerState.endTime;
  const startDate = plannerState.startDate;
  const endDate = plannerState.endDate;
  const selectedDays = plannerState.selectedDays;
  const lessonSubjectId = plannerState.lessonSubjectId;
  const allDaysSelected = plannerState.allDaysSelected;
  const templateFirebaseId = plannerState.templateBuilder.firebaseId;
  const lessonPlanner = plannerState.templateBuilder;

  // todo: get working
  // const builtLessons = selectedDays.reduce((obj: any, day: string) => {
  //   obj[day] = {
  //     date: '',
  //     items: [
  //       {
  //         id: uuidv4(),
  //         content: '',
  //         startTime: startTime,
  //         endTime: endTime,
  //         startDate: startDate,
  //         endDate: endDate,
  //         subjectId: lessonSubjectId,
  //       },
  //     ],
  //   };
  //   return obj;
  // }, {});

  if (allDaysSelected) {
    allWeekdays.map((day: string) => {
      lessonPlanner.weekdays[day].items.push({
        id: uuidv4(),
        content: '',
        startTime: startTime,
        endTime: endTime,
        startDate: startDate,
        endDate: endDate,
        subjectId: lessonSubjectId,
      });
    });
  } else {
    selectedDays.map((day: string) => {
      lessonPlanner.weekdays[day].items.push({
        id: uuidv4(),
        content: '',
        startTime: startTime,
        endTime: endTime,
        startDate: startDate,
        endDate: endDate,
        subjectId: lessonSubjectId,
      });
    });
  }

  return await firebase
    .database()
    .ref('/template-builder')
    .child(templateFirebaseId)
    .update(
      {
        weekdays: lessonPlanner.weekdays,
      },
      (error) => {
        if (error) {
          // error
        } else {
          alert('success');
        }
      }
    );
};

export const deleteItem = (
  day: string,
  itemToDelete: LessonItem
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  const plannerState = getState().lessonPlannerState;
  const templateFirebaseId = plannerState.templateBuilder.firebaseId;
  const weekdays = plannerState.templateBuilder.weekdays;
  const weekdayItems = weekdays[day];

  const updatedItems = weekdayItems.items.filter(
    (item: LessonItem) => item !== itemToDelete
  );

  Object.keys(weekdays).map((key: string) => {
    if (key === day) {
      weekdays[key].items = updatedItems;
    }
  });

  return await firebase
    .database()
    .ref('/template-builder')
    .child(templateFirebaseId)
    .update(
      {
        weekdays: weekdays,
      },
      (error) => {
        if (error) {
          // dispatch error snackbar
        } else {
          // dispatch success snackbar
        }
      }
    );
};

export const getTemplateBuilder = async () => {
  return await firebase
    .database()
    .ref('/template-builder')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};

export const buildAndSaveDefaultTemplate = async () => {
  const template = buildDefaultTemplate();
  const templateRef = firebase.database().ref('/template-builder');
  const newTemplateRef = templateRef.push();

  return await newTemplateRef.set(template, (error) => {
    if (error) {
      // error
    } else {
      console.log('SAVED_DEFAULT_TEMPLATE');
    }
  });
};
