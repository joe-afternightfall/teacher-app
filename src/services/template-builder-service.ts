import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { LessonItem } from '../configs/types/LessonPlanner';
import { lessonSaved } from '../creators/template-builder/lesson-saved';
import { displayAppSnackbar } from '../creators/application/app-snackbar';

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
            subjectId: plannerState.lessonSubjectId,
          },
        ],
      };
      return obj;
    }, {});
  }

  return await newTemplateRef.set(
    {
      updatedAt: new Date(),
      id: uuidv4(),
      title: 'Template Builder',
      startDate: plannerState.startDate.toLocaleDateString(),
      endDate: plannerState.endDate.toLocaleDateString(),
      weekdays: builtItems,
    },
    (error) => {
      if (error) {
        // dispatch error
      } else {
        dispatch(lessonSaved());
      }
    }
  );
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
  const selectedDays = plannerState.selectedDays;
  const lessonSubjectId = plannerState.lessonSubjectId;
  const allDaysSelected = plannerState.allDaysSelected;
  const templateFirebaseId = plannerState.templateBuilder.firebaseId;
  const lessonPlanner = plannerState.templateBuilder;

  if (allDaysSelected) {
    allWeekdays.map((day: string) => {
      if (lessonPlanner.weekdays[day].items !== undefined) {
        lessonPlanner.weekdays[day].items.push({
          id: uuidv4(),
          content: '',
          startTime: startTime,
          endTime: endTime,
          subjectId: lessonSubjectId,
        });
      } else {
        lessonPlanner.weekdays[day].items = [
          {
            id: uuidv4(),
            content: '',
            startTime: startTime,
            endTime: endTime,
            subjectId: lessonSubjectId,
          },
        ];
      }
    });
  } else {
    selectedDays.map((day: string) => {
      lessonPlanner.weekdays[day].items.push({
        id: uuidv4(),
        content: '',
        startTime: startTime,
        endTime: endTime,
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
