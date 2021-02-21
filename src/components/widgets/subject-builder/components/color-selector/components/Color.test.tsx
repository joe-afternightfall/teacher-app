import React from 'react';
import Color from './Color';
import { render } from '@testing-library/react';

describe('Color Component', () => {
  it('should render with color', () => {
    const colorComp = render(<Color color={'#F5F5F5'} />);

    expect(colorComp.container.childElementCount).toBe(1);
    expect(colorComp.getByTestId('color-box-#F5F5F5')).toHaveStyle(
      'color: #F5F5F5'
    );
  });
});
