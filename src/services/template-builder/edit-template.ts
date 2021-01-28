import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import { LessonItem } from '../../configs/models/LessonItem';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase';
import { lessonSaved } from '../../creators/template-builder/lesson-saved';

const allWeekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

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

  if (allDaysSelected) {
    allWeekdays.map((day: string) => {
      const newLessonItem = new LessonItem(
        uuidv4(),
        '',
        plannerState.startTime,
        plannerState.endTime,
        plannerState.lessonSubjectId,
        plannerState.lessonType,
        plannerState.otherLessonTypeName
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
        plannerState.startTime,
        plannerState.endTime,
        plannerState.lessonSubjectId,
        plannerState.lessonType,
        plannerState.otherLessonTypeName
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
          dispatch(lessonSaved());
        }
      }
    );
};
