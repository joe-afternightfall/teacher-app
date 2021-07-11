import React from 'react';
import { NavListItem } from './NavListItem';
import AddIcon from '@material-ui/icons/Add';
import { renderWithTheme } from '../../../../configs/test-utils/mock-redux';
import DashboardScreen from '../../../top-level-components/dashboard/DashboardScreen';

describe('Nav List Item Component', () => {
  const pageInfo = {
    path: '/test-path',
    drawerTitle: 'Test Drawer Title',
    headerTitle: 'Test Header Title',
    icon: AddIcon,
    testId: 'test-id',
    routerComponent: DashboardScreen,
  };

  it('should render with nav text', () => {
    const clickHandler = jest.fn();

    const navListItem = renderWithTheme(
      <NavListItem
        pageInfo={pageInfo}
        activePath={'/test-active'}
        clickHandler={clickHandler}
        displayText={true}
      />
    );

    expect(navListItem.getByTestId('list-item-test-id')).toBeInTheDocument();
    const listButton = navListItem.getByTestId('test-id');
    expect(listButton).toHaveClass('makeStyles-listItem-2');
    listButton.click();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('should render without nav text', () => {
    const clickHandler = jest.fn();

    const navListItem = renderWithTheme(
      <NavListItem
        pageInfo={pageInfo}
        activePath={'/test-active'}
        clickHandler={clickHandler}
        displayText={false}
      />
    );

    navListItem.getByTestId('test-id').click();
    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(
      navListItem.queryByTestId('list-item-test-id')
    ).not.toBeInTheDocument();
  });
});
