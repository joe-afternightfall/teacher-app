import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import { closeSubjectInfoDialog } from '../../creators/subject-list/subject-info-dialog';
import {
  subjectSaveComplete,
  updatingSubjectInfo,
} from '../../creators/subject-list/loading-subject';

export const deleteSubject = (
  id: string
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  dispatch(updatingSubjectInfo());

  return await firebase
    .database()
    .ref('/subjects')
    .child(id)
    .remove((error) => {
      if (error) {
        // dispatch error
        alert('error');
      } else {
        setTimeout(() => {
          dispatch(closeSubjectInfoDialog());
          dispatch(subjectSaveComplete());
        }, 1000);
      }
    });
};
