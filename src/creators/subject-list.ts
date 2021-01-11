import actions from './actions';
import { ColorChoice } from '../configs/theme/subject-color-choices';

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
