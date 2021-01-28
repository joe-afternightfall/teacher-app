import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import {
  subjectSaveFailed,
  subjectSaveComplete,
  updatingSubjectInfo,
} from '../../creators/subject-list/loading-subject';
import { SubjectDAO } from '../../configs/models/SubjectDAO';
import {
  clearSubjectInfoDialog,
  closeSubjectInfoDialog,
} from '../../creators/subject-list/subject-info-dialog';

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

  const subjectDAO = new SubjectDAO(
    uuidv4(),
    listState.subjectName,
    listState.selectedColor.id,
    listState.selectedColor.primaryColor,
    listState.selectedColor.secondaryColor,
    listState.selectedIconId
  );

  return await newSubjectRef.set(subjectDAO, (error) => {
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
  });
};