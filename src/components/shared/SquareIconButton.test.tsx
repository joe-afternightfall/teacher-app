import React from 'react';
import { render } from '@testing-library/react';
import SquareIconButton from './SquareIconButton';
import { ChevronLeft } from '@material-ui/icons';


describe('Square Icon Button Component', () => {
  it('should render without custom style', () => {
    const clickHandler = jest.fn();

    const iconButton = render(
      <SquareIconButton
        disabled={false}
        icon={<ChevronLeft />}
        clickHandler={clickHandler}
        testId={'icon-test-id'}
      />);

    iconButton.getByTestId('icon-test-id').click();
    expect(clickHandler).toHaveBeenCalledTimes(1);
    let foundTestId = iconButton.getByTestId('icon-test-id');
    expect(foundTestId.className).toContain('makeStyles-root-1');
  });

  it('should render with custom style', () => {
    const iconButton = render(
      <SquareIconButton
        disabled={false}
        icon={<ChevronLeft />}
        clickHandler={jest.fn()}
        testId={'icon-test-id'}
        customStyle={'customStyles'}
      />);

    let foundTestId = iconButton.getByTestId('icon-test-id');
    expect(foundTestId.className).toContain('customStyles');
  });
});