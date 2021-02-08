import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import {
  subjectSaveComplete,
  updatingSubjectInfo,
} from '../../creators/subject-list/loading-subject';
import {
  clearSubjectBuilderDialog,
  closeSubjectBuilderDialog,
} from '../../creators/subject-list/subject-builder-dialog';

export const editSubject = (): ThunkAction<
  void,
  State,
  void,
  AnyAction
> => async (dispatch: Dispatch, getState: () => State): Promise<void> => {
  dispatch(updatingSubjectInfo());

  const listState = getState().subjectListState;

  return await firebase
    .database()
    .ref('/subjects')
    .child(listState.editingFormFirebaseId)
    .update(
      {
        subjectName: listState.subjectName,
        primaryColorId: listState.selectedColor.id,
        primaryColor: listState.selectedColor.primaryColor,
        secondaryColor: listState.selectedColor.secondaryColor,
        iconId: listState.selectedIconId,
      },
      (error) => {
        if (error) {
          // dispatch error
          alert('error');
        } else {
          dispatch(clearSubjectBuilderDialog());
          setTimeout(() => {
            dispatch(closeSubjectBuilderDialog());
            dispatch(subjectSaveComplete());
          }, 1000);
        }
      }
    );
};
