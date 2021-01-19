import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';

export const saveTemplateBuilder = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const plannerState = getState().lessonPlannerState;
  const templateRef = firebase.database().ref('/template-builder');
  const newTemplateRef = templateRef.push();

  return await newTemplateRef.set(
    {
      id: uuidv4(),
      lessonSubjectId: plannerState.lessonSubjectId,
    },
    (error) => {
      if (error) {
        // error
      } else {
        // success
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
