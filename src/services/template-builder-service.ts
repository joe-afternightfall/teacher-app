import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { buildDefaultTemplate } from '../utils/template-builder';
import { LessonPlanner } from '../configs/models/LessonPlanner';

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
  const templateFirebaseId = plannerState.templateFirebaseId;
  const lessonPlanner = plannerState.lessonPlanners[0];

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

  selectedDays.map((day) => {
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
