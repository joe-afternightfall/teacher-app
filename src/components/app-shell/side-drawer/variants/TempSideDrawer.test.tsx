import { getStore, renderWithRedux } from '../../../../configs/test-utils/mock-redux';
import TempSideDrawer from './TempSideDrawer';
import AddIcon from '@material-ui/icons/Add';
import { FULL_DRAWER_WIDTH } from '../../../../configs/constants/drawer-size';

describe('Temp Side Drawer Component', () => {
  const pageInfo = {
    path: '/test-nav-path',
    drawerTitle: 'Test Nav Title',
    headerTitle: 'Test Nav Title',
    icon: AddIcon,
    testId: 'test-nav-id',
  };

  it('should render with info', () => {
    let store = getStore({
      activePage: pageInfo,
      sideDrawerIsOpen: true,
      drawerSize: FULL_DRAWER_WIDTH,
    }, null);
    const drawer = renderWithRedux(<TempSideDrawer />, store);

    expect(drawer.getByTestId('temp-side-drawer')).toBeInTheDocument();
    expect(drawer.getByAltText('app-logo')).toBeInTheDocument();
    // drawer.getByTestId('chevron-left-toggle-button').click();
    // expect(store.getActions()).toEqual('');
  });
});