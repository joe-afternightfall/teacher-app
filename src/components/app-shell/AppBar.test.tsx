import AppBar from './AppBar';
import * as React from 'react';
import actions from '../../creators/actions';
import { getStore, renderWithRedux } from '../../configs/test-utils/mock-redux';

describe('App Bar Test', () => {
  it('should render with title', () => {
    const store = getStore({});
    const appBar = renderWithRedux(<AppBar />, store);

    expect(appBar.getByAltText('cool-shades-icon')).toBeInTheDocument();

    appBar.getByTestId('toggle-app-drawer-button').click();

    expect(store.getActions()).toStrictEqual([
      {
        type: actions.OPEN_SIDE_DRAWER,
      },
    ]);
  });
});
