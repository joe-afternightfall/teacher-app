import { ColorChoice } from '../../configs/theme/subject-color-choices';
import actions from '../actions';

// todo:  combine with subject builder dialog
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
