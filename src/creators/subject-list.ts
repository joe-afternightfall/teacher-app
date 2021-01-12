import actions from './actions';
import { ColorChoice } from '../configs/theme/subject-color-choices';
import { Subject } from '../configs/types/Subject';
import { saveSubject } from '../services/subject-list';

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

export const saveSubjectInfo = (subject: Subject) => {
  console.log('subject: ' + JSON.stringify(subject));

  saveSubject(subject)
    .then((response) => {
      console.log('response: ' + JSON.stringify(response));
      // (dispatch as ThunkDispatch<State, void, AnyAction>)(login(username));
    })
    .catch((error: Error) => {
      console.log(`failed auth with error: ${error}`);
    });

  return {
    type: actions.SAVE_SUBJECT_INFO,
  };
};
