import { render } from '@testing-library/react';
import SideDrawerAppBar from './SideDrawerAppBar';
import { FULL_DRAWER_WIDTH, MIN_DRAWER_WIDTH } from '../../../../configs/constants/drawer-size';

describe('Side Drawer App Bar', () => {
  it('should click close', () => {
    const closeHandler = jest.fn();
    const logoHandler = jest.fn();

    const appBar = render(
      <SideDrawerAppBar
        logoClickHandler={logoHandler}
        closeHandler={closeHandler}
        drawerSize={FULL_DRAWER_WIDTH}
      />);

    appBar.getByTestId('chevron-left-toggle-button').click();
    expect(closeHandler).toBeCalledTimes(1);
  });

  it('should click logo button', () => {
    const logoHandler = jest.fn();

    const appBar = render(
      <SideDrawerAppBar
        logoClickHandler={logoHandler}
        drawerSize={MIN_DRAWER_WIDTH}
      />);

    appBar.getByTestId('logo-button').click();
    expect(logoHandler).toBeCalledTimes(1);
  });

  // it('should not call click handler', () => {
  //   const appBar = render(
  //     <SideDrawerAppBar
  //       logoClickHandler={undefined}
  //       drawerSize={MIN_DRAWER_WIDTH}
  //     />);
  //
  //   appBar.getByTestId('logo-button').click();
  //   expect(appBar.getByAltText('min-logo')).toBeInTheDocument();
  // });

  it('should render without', () => {
    const appBar = render(<SideDrawerAppBar />);

    expect(appBar.getByAltText('app-logo')).toBeInTheDocument();
  });
});
