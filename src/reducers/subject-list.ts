import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { ColorChoice } from '../configs/theme/subject-color-choices';

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
      default:
        newState = state;
    }

    return newState;
  },
};

export interface SubjectListState {
  selectedColor: ColorChoice;
}
