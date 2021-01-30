import { AnyAction } from 'redux';
import actions from '../actions';

export const toggleSideDrawer = (): AnyAction => {
  return {
    type: actions.TOGGLE_SIDE_DRAWER,
  };
};
