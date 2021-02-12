import React from 'react';
import { MockStore } from 'redux-mock-store';
import AddIcon from '@material-ui/icons/Add';
import PermSideDrawer from './PermSideDrawer';
import {
  getStore,
  renderWithRedux,
} from '../../../../configs/test-utils/mock-redux';
import actions from '../../../../creators/actions';
import { MuiThemeProvider } from '@material-ui/core';
import { getThemeWithSize } from '../../../../configs/test-utils/test-theme';
import { FULL_DRAWER_WIDTH } from '../../../../configs/constants/drawer-size';

describe('Perm Side Drawer Component', () => {
  const pageInfo = {
    path: '/test-nav-path',
    drawerTitle: 'Test Nav Title',
    headerTitle: 'Test Nav Title',
    icon: AddIcon,
    testId: 'test-nav-id',
  };

  let store: MockStore;

  beforeEach(() => {
    store = getStore(
      {
        activePage: pageInfo,
        sideDrawerIsOpen: true,
        drawerSize: FULL_DRAWER_WIDTH,
      },
      null
    );
  });

  it('should render with drawer', () => {
    const sideDrawer = renderWithRedux(
      <PermSideDrawer />,
      getStore(
        {
          activePage: pageInfo,
          sideDrawerIsOpen: true,
          drawerSize: FULL_DRAWER_WIDTH,
        },
        null
      )
    );

    expect(sideDrawer.getByTestId('perm-side-drawer')).toBeInTheDocument();
  });

  it('should dispatch when close button clicked', async () => {
    const theme = getThemeWithSize('md');

    // let store = getStore(
    //   {
    //     activePage: pageInfo,
    //     sideDrawerIsOpen: true,
    //     drawerSize: FULL_DRAWER_WIDTH,
    //   },
    //   null
    // );
    const sideDrawer = renderWithRedux(
      <MuiThemeProvider theme={theme}>
        <PermSideDrawer />
      </MuiThemeProvider>,
      store
    );

    sideDrawer.getByTestId('chevron-left-toggle-button').click();

    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()).toStrictEqual([
      {
        type: actions.USER_CLICKED_CLOSE_DRAWER,
      },
      {
        size: '56px',
        type: actions.SET_DRAWER_SIZE,
      },
    ]);
  });

  it('should dispatch user clicked drawer open', () => {
    const theme = getThemeWithSize('lg');

    const sideDrawer = renderWithRedux(
      <MuiThemeProvider theme={theme}>
        <PermSideDrawer />
      </MuiThemeProvider>,
      store
    );

    sideDrawer.getByTestId('chevron-left-toggle-button').click();

    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()).toStrictEqual([
      {
        type: actions.USER_CLICKED_CLOSE_DRAWER,
      },
      {
        size: '56px',
        type: actions.SET_DRAWER_SIZE,
      },
    ]);
  });
});
