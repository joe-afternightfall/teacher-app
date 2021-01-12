import actions from './actions';
import { ColorChoice } from '../configs/theme/subject-color-choices';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import { Subject } from '../configs/types/WeeklyPlanner';

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

export const selectIcon = (icon: OverridableComponent<SvgIconTypeMap>) => {
  return {
    type: actions.SELECT_ICON,
    icon: icon,
  };
};

export const updateSubjectName = (subjectName: string) => {
  return {
    type: actions.UPDATE_SUBJECT_NAME,
    subjectName: subjectName,
  };
};

export const saveSubjectInfo = (subject: Subject) => {
  return {
    type: actions.SAVE_SUBJECT_INFO,
    subject: subject,
  };
};

export const openSubjectInfoDialog = () => {
  return {
    type: actions.OPEN_SUBJECT_INFO_DIALOG,
  }
}

export const closeSubjectInfoDialog = () => {
  return {
    type: actions.CLOSE_SUBJECT_INFO_DIALOG,
  }
}
