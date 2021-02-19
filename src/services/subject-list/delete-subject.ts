import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import {
  subjectSaveComplete,
  updatingSubjectInfo,
} from '../../creators/subject-list/loading-subject';
import { closeSubjectBuilderDialog } from '../../creators/subject-list/subject-builder-dialog';

export const deleteSubject = (
  id: string
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch
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
          dispatch(closeSubjectBuilderDialog());
          dispatch(subjectSaveComplete());
        }, 1000);
      }
    });
};
