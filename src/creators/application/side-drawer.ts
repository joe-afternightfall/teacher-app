import { AnyAction } from 'redux';
import actions from '../actions';

export const closeSideDrawer = (): AnyAction => {
  return {
    type: actions.CLOSE_SIDE_DRAWER,
  };
};

export const openSideDrawer = (): AnyAction => {
  return {
    type: actions.OPEN_SIDE_DRAWER,
  };
};

export const setDrawerSize = (size: string): AnyAction => {
  return {
    type: actions.SET_DRAWER_SIZE,
    size: size,
  };
};
