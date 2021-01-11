import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { ColorChoice } from '../configs/theme/subject-color-choices';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

export default {
  reducer(
    state: SubjectListState = ({} as unknown) as SubjectListState,
    action: AnyAction
  ): SubjectListState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.SELECT_COLOR:
        newState.selectedColor = action.selectedColor;
        break;
      case actions.SELECT_ICON:
        newState.selectedIcon = action.icon;
        break;
      case actions.UPDATE_SUBJECT_NAME:
        newState.subjectName = action.subjectName;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface SubjectListState {
  selectedColor: ColorChoice;
  selectedIcon: OverridableComponent<SvgIconTypeMap>;
  subjectName: string;
}
