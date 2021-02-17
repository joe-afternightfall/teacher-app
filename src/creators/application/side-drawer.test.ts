import {
  closeSideDrawer,
  openSideDrawer,
  setDrawerSize,
  userClickedCloseDrawer,
  userClickedOpenDrawer,
} from './side-drawer';
import actions from '../actions';

describe('side drawer creator', () => {
  it('should return CLOSE_SIDE_DRAWER', () => {
    const response = closeSideDrawer();

    expect(response).toEqual({
      type: actions.CLOSE_SIDE_DRAWER,
    });
  });

  it('should return OPEN_SIDE_DRAWER', () => {
    const response = openSideDrawer();

    expect(response).toEqual({
      type: actions.OPEN_SIDE_DRAWER,
    });
  });

  it('should return SET_DRAWER_SIZE', () => {
    const response = setDrawerSize('45px');

    expect(response).toEqual({
      type: actions.SET_DRAWER_SIZE,
      size: '45px',
    });
  });

  it('should return USER_CLICKED_CLOSE_DRAWER', () => {
    const response = userClickedCloseDrawer();

    expect(response).toEqual({
      type: actions.USER_CLICKED_CLOSE_DRAWER,
    });
  });

  it('should return USER_CLICKED_OPEN_DRAWER', () => {
    const response = userClickedOpenDrawer();

    expect(response).toEqual({
      type: actions.USER_CLICKED_OPEN_DRAWER,
    });
  });
});
