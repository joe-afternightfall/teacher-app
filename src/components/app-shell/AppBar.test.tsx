import AppBar from './AppBar';
import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { getStore, renderWithRedux } from '../../configs/test-utils/mock-redux';

describe('App Bar Test', () => {
  it('should render with title', () => {
    const appBar = renderWithRedux(
      <AppBar />,
      getStore(
        {
          activePage: {
            path: '/testing',
            drawerTitle: 'Test Drawer Title',
            headerTitle: 'Test Header Title',
            icon: AddIcon,
            testId: 'testId',
          },
        },
        null
      )
    );

    expect(appBar.getByTestId('app-bar-title')).toBeInTheDocument();
    expect(appBar.getByText('Test Header Title')).toBeInTheDocument();
  });
});
