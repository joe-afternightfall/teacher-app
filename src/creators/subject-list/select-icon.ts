import actions from '../actions';
import { AnyAction } from 'redux';

// todo:  combine with subject builder dialog
export const selectIcon = (iconId: string): AnyAction => {
  return {
    type: actions.SELECT_ICON,
    iconId: iconId,
  };
};
