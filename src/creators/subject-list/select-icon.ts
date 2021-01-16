import actions from '../actions';
import { AnyAction } from 'redux';

export const selectIcon = (iconId: string): AnyAction => {
  return {
    type: actions.SELECT_ICON,
    iconId: iconId,
  };
};
