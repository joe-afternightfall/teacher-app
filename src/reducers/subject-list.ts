import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { Subject } from '../configs/types/Subject';
import { ColorChoice } from '../configs/theme/subject-color-choices';

export default {
  reducer(
    state: SubjectListState = ({} as unknown) as SubjectListState,
    action: AnyAction
  ): SubjectListState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        newState.subjectList = action.subjectList;
        break;
      case actions.SELECT_COLOR:
        newState.selectedColor = action.selectedColor;
        break;
      case actions.SELECT_ICON:
        newState.selectedIconId = action.iconId;
        break;
      case actions.UPDATE_SUBJECT_NAME:
        newState.subjectName = action.subjectName;
        break;
      case actions.OPEN_SUBJECT_INFO_DIALOG:
        newState.displaySubjectInfo = true;
        break;
      case actions.CLOSE_SUBJECT_INFO_DIALOG:
        newState.displaySubjectInfo = false;
        break;
      case actions.UPDATING_SUBJECT_INFO:
        newState.displayLoader = true;
        break;
      case actions.SUBJECT_SAVE_COMPLETE:
        newState.displayLoader = false;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface SubjectListState {
  subjectName: string;
  selectedIconId: string;
  subjectList: Subject[];
  selectedColor: ColorChoice;
  displaySubjectInfo: boolean;
  displayLoader: boolean;
}
