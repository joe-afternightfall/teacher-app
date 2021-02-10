import React from 'react';
import Navigation from './Navigation';
import AddIcon from '@material-ui/icons/Add';
import {
  getStore,
  renderWithRedux,
} from '../../../../configs/test-utils/mock-redux';

describe('Navigation Component', () => {
  const pageInfo = {
    path: '/test-nav-path',
    drawerTitle: 'Test Nav Title',
    headerTitle: 'Test Nav Title',
    icon: AddIcon,
    testId: 'test-nav-id',
  };

  it('should render with info', async () => {
    const store = getStore(
      {
        activePage: pageInfo,
        sideDrawerIsOpen: true,
        drawerSize: '240',
      },
      null
    );

    const nav = renderWithRedux(<Navigation tempDrawer={false} />, store);

    nav.getByTestId('dashboard').click();

    await new Promise((res) => setTimeout(res, 500));

    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()).toEqual([
      {
        payload: {
          args: ['/'],
          method: 'push',
        },
        type: '@@router/CALL_HISTORY_METHOD',
      },
      {
        type: 'CLOSE_SIDE_DRAWER',
      },
    ]);
  });
});
