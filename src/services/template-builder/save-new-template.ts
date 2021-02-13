import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import { LessonItem } from '../../configs/models/LessonItem';
import { LessonPlannerDAO } from '../../configs/models/LessonPlannerDAO';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';
import {
  clearTemplateBuilderForm,
  savedTemplateBuilder,
} from '../../creators/template-builder/builder';

const allWeekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export const saveNewTemplate = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const builderState = getState().templateBuilderState;
  const templateRef = firebase.database().ref('/template-builder');
  const newTemplateRef = templateRef.push();
  const allDaysSelected = builderState.allDaysSelected;
  let builtItems;

  if (allDaysSelected) {
    builtItems = allWeekdays.reduce((obj: any, day: string) => {
      const newLessonItem = new LessonItem(
        uuidv4(),
        '',
        builderState.startTime,
        builderState.endTime,
        builderState.lessonSubjectId ? builderState.lessonSubjectId : '',
        builderState.lessonType,
        builderState.otherLessonTypeName
      );

      obj[day] = {
        date: '',
        items: [newLessonItem],
      };
      return obj;
    }, {});
  } else {
    builtItems = builderState.selectedDays.reduce((obj: any, day: string) => {
      const newLessonItem = new LessonItem(
        uuidv4(),
        '',
        builderState.startTime,
        builderState.endTime,
        builderState.lessonSubjectId,
        builderState.lessonType,
        builderState.otherLessonTypeName
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
    '',
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
      dispatch(
        displayAppSnackbar({
          text: 'Saved Template Builder',
          severity: 'success',
          position: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        })
      );
      dispatch(savedTemplateBuilder());
      dispatch(clearTemplateBuilderForm());
    }
  });
};
