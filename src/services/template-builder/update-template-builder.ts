import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import { LessonItem } from '../../configs/models/LessonItem';
import { displayAppSnackbar } from '../../creators/application/app-snackbar';
import {
  clearTemplateBuilderForm,
  savedTemplateBuilder,
} from '../../creators/template-builder/builder';

const allWeekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export const updateTemplate = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const builderState = getState().templateBuilderState;
  const selectedDays = builderState.selectedDays;
  const allDaysSelected = builderState.allDaysSelected;

  const templateFirebaseId = builderState.templateBuilder.firebaseId;
  const lessonPlanner = builderState.templateBuilder;

  if (allDaysSelected) {
    allWeekdays.map((day: string) => {
      const newLessonItem = new LessonItem(
        uuidv4(),
        '',
        builderState.startTime,
        builderState.endTime,
        builderState.lessonSubjectId,
        builderState.lessonType,
        builderState.otherLessonTypeName
      );

      if (lessonPlanner.weekdays[day].items !== undefined) {
        lessonPlanner.weekdays[day].items.push(newLessonItem);
      } else {
        lessonPlanner.weekdays[day].items = [newLessonItem];
      }
    });
  } else {
    selectedDays.map((day: string) => {
      const newLessonItem = new LessonItem(
        uuidv4(),
        '',
        builderState.startTime,
        builderState.endTime,
        builderState.lessonSubjectId,
        builderState.lessonType,
        builderState.otherLessonTypeName
      );
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
          dispatch(
            displayAppSnackbar({
              text: 'Added Item to Template',
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
      }
    );
};
