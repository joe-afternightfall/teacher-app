import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { lessonSaved } from '../creators/template-builder/lesson-saved';
import { displayAppSnackbar } from '../creators/application/app-snackbar';
import { updatedLessonBoard } from '../creators/lesson-planner/update-items';
import { LessonItem } from '../configs/models/LessonItem';
import { LessonPlannerDAO } from '../configs/models/LessonPlannerDAO';

const allWeekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export const saveDates = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const plannerState = getState().lessonPlannerState;
  const templateFirebaseId = plannerState.templateBuilder.firebaseId;

  return await firebase
    .database()
    .ref('/template-builder')
    .child(templateFirebaseId)
    .update(
      {
        endDate: plannerState.endDate.toLocaleDateString(),
        startDate: plannerState.startDate.toLocaleDateString(),
      },
      (error) => {
        if (error) {
          // error
        } else {
          dispatch(
            displayAppSnackbar({
              text: 'Updated Dates',
              severity: 'success',
              position: {
                vertical: 'bottom',
                horizontal: 'right',
              },
            })
          );
        }
      }
    );
};

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

  // todo:  plannerState.startTime.toISOString() or toLocaleDateString() is the visual format we want
  if (allDaysSelected) {
    builtItems = allWeekdays.reduce((obj: any, day: string) => {
      const newLessonItem = new LessonItem(
        uuidv4(),
        '',
        plannerState.startTime,
        plannerState.endTime,
        plannerState.lessonSubjectId,
        plannerState.lessonType,
        plannerState.otherLessonTypeName
      );

      obj[day] = {
        date: '',
        items: [newLessonItem],
      };
      return obj;
    }, {});
  } else {
    builtItems = plannerState.selectedDays.reduce((obj: any, day: string) => {
      const newLessonItem = new LessonItem(
        uuidv4(),
        '',
        plannerState.startTime,
        plannerState.endTime,
        plannerState.lessonSubjectId,
        plannerState.lessonType,
        plannerState.otherLessonTypeName
      );

      obj[day] = {
        date: '',
        items: [newLessonItem],
      };
      return obj;
    }, {});
  }

  // todo:  remove "startDate" and "endDate" from lesson planner object and create its only endpoint
  const lessonPlannerDAO = new LessonPlannerDAO(
    new Date(),
    uuidv4(),
    'Template Builder',
    plannerState.startDate ? plannerState.startDate : new Date(),
    plannerState.endDate ? plannerState.endDate : new Date(),
    builtItems,
    []
  );

  return await newTemplateRef.set(JSON.stringify(lessonPlannerDAO), (error) => {
    if (error) {
      dispatch(
        displayAppSnackbar({
          text: 'Failed to update',
          severity: 'error',
          position: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        })
      );
    } else {
      dispatch(lessonSaved());
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
  const selectedDays = plannerState.selectedDays;
  const allDaysSelected = plannerState.allDaysSelected;

  const templateFirebaseId = plannerState.templateBuilder.firebaseId;
  const lessonPlanner = plannerState.templateBuilder;

  const newLessonItem = new LessonItem(
    uuidv4(),
    '',
    plannerState.startTime,
    plannerState.endTime,
    plannerState.lessonSubjectId,
    plannerState.lessonType,
    plannerState.otherLessonTypeName
  );

  if (allDaysSelected) {
    allWeekdays.map((day: string) => {
      if (lessonPlanner.weekdays[day].items !== undefined) {
        lessonPlanner.weekdays[day].items.push(newLessonItem);
      } else {
        lessonPlanner.weekdays[day].items = [newLessonItem];
      }
    });
  } else {
    selectedDays.map((day: string) => {
      lessonPlanner.weekdays[day].items.push(newLessonItem);
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
          dispatch(lessonSaved());
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

export const updateLessonBoardOrder = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const plannerState = getState().lessonPlannerState;
  const templateFirebaseId = plannerState.templateBuilder.firebaseId;
  const weekdays = plannerState.templateBuilder.weekdays;


  // todo:  try defaulting the items values in model object
  return await firebase
    .database()
    .ref('/template-builder')
    .child(templateFirebaseId)
    .update(
      {
        weekdays: {
          monday: {
            date: '',
            items: weekdays.monday.items ? weekdays.monday.items : [],
          },
          tuesday: {
            date: '',
            items: weekdays.tuesday.items ? weekdays.tuesday.items : [],
          },
          wednesday: {
            date: '',
            items: weekdays.wednesday.items ? weekdays.wednesday.items : [],
          },
          thursday: {
            date: '',
            items: weekdays.thursday.items ? weekdays.thursday.items : [],
          },
          friday: {
            date: '',
            items: weekdays.friday.items ? weekdays.friday.items : [],
          },
        },
      },
      (error) => {
        if (error) {
          dispatch(
            displayAppSnackbar({
              text: 'Error Saving',
              severity: 'error',
              position: {
                vertical: 'bottom',
                horizontal: 'right',
              },
            })
          );
        } else {
          dispatch(
            displayAppSnackbar({
              text: 'Board Updated',
              severity: 'success',
              position: {
                vertical: 'bottom',
                horizontal: 'right',
              },
            })
          );
          dispatch(updatedLessonBoard());
        }
      }
    );
};
