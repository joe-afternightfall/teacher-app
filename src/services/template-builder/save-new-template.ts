import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { LessonItem } from '../../configs/models/LessonItem';
import { v4 as uuidv4 } from 'uuid';
import { LessonPlannerDAO } from '../../configs/models/LessonPlannerDAO';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';
import { lessonSaved } from '../../creators/template-builder/lesson-saved';

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
      const newLessonItem = new LessonItem(
        uuidv4(),
        '',
        plannerState.startTime,
        plannerState.endTime,
        plannerState.lessonSubjectId ? plannerState.lessonSubjectId : '',
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

  const lessonPlannerDAO = new LessonPlannerDAO(
    new Date().toISOString(),
    uuidv4(),
    'Template Builder',
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
