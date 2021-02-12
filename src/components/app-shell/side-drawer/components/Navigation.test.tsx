import React from 'react';
import Navigation from './Navigation';
import AddIcon from '@material-ui/icons/Add';
import { MockStore } from 'redux-mock-store';
import {
  getStore,
  renderWithRedux,
} from '../../../../configs/test-utils/mock-redux';
import { RenderResult } from '@testing-library/react';
import {
  FULL_DRAWER_WIDTH,
  MIN_DRAWER_WIDTH,
} from '../../../../configs/constants/drawer-size';

describe('Navigation Component', () => {
  const pageInfo = {
    path: '/test-nav-path',
    drawerTitle: 'Test Nav Title',
    headerTitle: 'Test Nav Title',
    icon: AddIcon,
    testId: 'test-nav-id',
  };

  let store: MockStore;
  let nav: RenderResult;

  describe('when side drawer is open', () => {
    beforeEach(() => {
      store = getStore(
        {
          activePage: pageInfo,
          sideDrawerIsOpen: true,
          drawerSize: FULL_DRAWER_WIDTH,
        },
        null
      );

      nav = renderWithRedux(<Navigation tempDrawer={false} />, store);
    });

    it('should render with info', async () => {
      nav.getByTestId('dashboard-nav').click();
      await new Promise((res) => setTimeout(res, 500));
      checkStore('/');
    });

    it('should click bookmark', async () => {
      nav.getByTestId('bookmarks-nav').click();
      await new Promise((res) => setTimeout(res, 500));
      checkStore('/bookmarks');
    });

    it('should click lesson planner', async () => {
      nav.getByTestId('lesson-planner-nav').click();
      await new Promise((res) => setTimeout(res, 500));
      checkStore('/lesson-planner');
    });

    it('should click template builder', async () => {
      nav.getByTestId('template-builder-nav').click();
      await new Promise((res) => setTimeout(res, 500));
      checkStore('/template-builder');
    });

    function checkStore(route: string) {
      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      expect(actions).toEqual([
        {
          payload: {
            args: [route],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        },
        {
          type: 'CLOSE_SIDE_DRAWER',
        },
      ]);
    }
  });

  describe('when side drawer is closed', () => {
    beforeEach(() => {
      store = getStore(
        {
          activePage: pageInfo,
          sideDrawerIsOpen: false,
          drawerSize: MIN_DRAWER_WIDTH,
        },
        null
      );

      nav = renderWithRedux(<Navigation tempDrawer={true} />, store);
    });

    it('should not dispatch close drawer', async () => {
      nav.getByTestId('template-builder-nav').click();

      await new Promise((res) => setTimeout(res, 500));

      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      expect(actions).toEqual([
        {
          payload: {
            args: ['/template-builder'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        },
      ]);
    });
  });
});
