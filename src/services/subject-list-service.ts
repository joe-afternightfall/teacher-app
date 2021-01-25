import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import {
  subjectSaveFailed,
  updatingSubjectInfo,
  subjectSaveComplete,
} from '../creators/subject-list/loading-subject';
import {
  clearSubjectInfoDialog,
  closeSubjectInfoDialog,
} from '../creators/subject-list/subject-info-dialog';

export const saveSubjectInfo = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  const listState = getState().subjectListState;
  const subjectListRef = firebase.database().ref('/subjects');
  const newSubjectRef = subjectListRef.push();

  dispatch(updatingSubjectInfo());

  return await newSubjectRef.set(
    {
      id: uuidv4(),
      subjectName: listState.subjectName,
      primaryColorId: listState.selectedColor.id,
      primaryColor: listState.selectedColor.primaryColor,
      secondaryColor: listState.selectedColor.secondaryColor,
      iconId: listState.selectedIconId,
    },
    (error) => {
      if (error) {
        dispatch(subjectSaveFailed());
      } else {
        // todo:  rip out to common method
        dispatch(clearSubjectInfoDialog());
        setTimeout(() => {
          dispatch(closeSubjectInfoDialog());
          dispatch(subjectSaveComplete());
        }, 1000);
      }
    }
  );
};

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

export const editSubject = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  dispatch(updatingSubjectInfo());

  const subjectListState = getState().subjectListState;

  return await firebase
    .database()
    .ref('/subjects')
    .child(subjectListState.editingFormFirebaseId)
    .update(
      {
        id: subjectListState.editingFormId,
        subjectName: subjectListState.subjectName,
        primaryColorId: subjectListState.selectedColor.id,
        primaryColor: subjectListState.selectedColor.primaryColor,
        secondaryColor: subjectListState.selectedColor.secondaryColor,
        iconId: subjectListState.selectedIconId,
      },
      (error) => {
        if (error) {
          // dispatch error
          alert('error');
        } else {
          dispatch(clearSubjectInfoDialog());
          setTimeout(() => {
            dispatch(closeSubjectInfoDialog());
            dispatch(subjectSaveComplete());
          }, 1000);
        }
      }
    );
};

export const getSubjects = async () => {
  return await firebase
    .database()
    .ref('/subjects')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};
