import {
  updatingSubjectInfo,
  subjectSaveFailed,
  subjectSaveComplete,
} from './loading-data';
import actions from './actions';
import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { Subject } from '../configs/types/Subject';
import { ColorChoice } from '../configs/theme/subject-color-choices';

// todo: break up file

export const selectColor = (color: ColorChoice): SelectColorAction => {
  return {
    type: actions.SELECT_COLOR,
    selectedColor: color,
  };
};

export interface SelectColorAction {
  type: string;
  selectedColor: ColorChoice;
}

export const selectIcon = (iconId: string) => {
  return {
    type: actions.SELECT_ICON,
    iconId: iconId,
  };
};

export const updateSubjectName = (subjectName: string) => {
  return {
    type: actions.UPDATE_SUBJECT_NAME,
    subjectName: subjectName,
  };
};

export const openSubjectInfoDialog = () => {
  return {
    type: actions.OPEN_SUBJECT_INFO_DIALOG,
  };
};

export const closeSubjectInfoDialog = () => {
  return {
    type: actions.CLOSE_SUBJECT_INFO_DIALOG,
  };
};

export const loadSubjectList = (subjectList: any) => {
  return {
    type: actions.LOAD_SUBJECT_LIST,
    subjectList: subjectList,
  };
};

export const clearSubjectInfoDialog = () => {
  return {
    type: actions.CLEAR_SUBJECT_INFO_DIALOG,
  };
};

export const saveSubjectInfo = (
  subject: Subject
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  // todo:  try using getState and not passing in anything

  // todo:  make database().ref() dynamic
  const subjectListRef = firebase.database().ref('/subjects');
  const newSubjectRef = subjectListRef.push();

  dispatch(updatingSubjectInfo());

  return await newSubjectRef.set(
    {
      id: subject.id,
      subjectName: subject.subjectName,
      primaryColorId: subject.primaryColorId,
      primaryColor: subject.primaryColor,
      secondaryColor: subject.secondaryColor,
      iconId: subject.iconId,
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

export const getSubjects = async () => {
  return await firebase
    .database()
    .ref('/subjects')
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
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
      } else {
        setTimeout(() => {
          dispatch(closeSubjectInfoDialog());
          dispatch(subjectSaveComplete());
        }, 1000);
      }
    });
};
