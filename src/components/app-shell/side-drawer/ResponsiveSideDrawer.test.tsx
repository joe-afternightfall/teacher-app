import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { MuiThemeProvider } from '@material-ui/core';
import ResponsiveSideDrawer from './ResponsiveSideDrawer';
import { getThemeWithSize } from '../../../configs/test-utils/test-theme';
import { FULL_DRAWER_WIDTH } from '../../../configs/constants/drawer-size';
import {
  getStore,
  renderWithRedux,
} from '../../../configs/test-utils/mock-redux';

describe('Responsive Side Drawer', () => {
  const pageInfo = {
    path: '/test-nav-path',
    drawerTitle: 'Test Nav Title',
    headerTitle: 'Test Nav Title',
    icon: AddIcon,
    testId: 'test-nav-id',
  };

  it('should render with temp side drawer', () => {
    const theme = getThemeWithSize('xs');

    const sideDrawer = renderWithRedux(
      <MuiThemeProvider theme={theme}>
        <ResponsiveSideDrawer />
      </MuiThemeProvider>,
      getStore(
        {
          activePage: pageInfo,
          sideDrawerIsOpen: true,
          drawerSize: FULL_DRAWER_WIDTH,
        },
        null
      )
    );

    expect(sideDrawer.getByTestId('temp-side-drawer')).toBeInTheDocument();
  });

  it('should render with perm side drawer', () => {
    const theme = getThemeWithSize('md');

    const sideDrawer = renderWithRedux(
      <MuiThemeProvider theme={theme}>
        <ResponsiveSideDrawer />
      </MuiThemeProvider>,
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
});
