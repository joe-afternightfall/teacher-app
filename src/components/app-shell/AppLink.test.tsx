import React from 'react';
import AppLink from './AppLink';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('App Link Component', () => {
  it('should render', () => {
    const appLink = render(<AppLink url={'www.google.com'} title={'Google'} />);

    expect(appLink.getByText('Google')).toBeInTheDocument();
    expect(appLink.getByTestId('app-link-www.google.com')).toBeDefined();
  });

  it('should render with', () => {
    const appLink = render(
      <AppLink url={'https://www.nasa.gov'} title={'NASA'} />
    );

    expect(appLink.getByText('NASA')).toBeInTheDocument();
    expect(appLink.getByTestId('app-link-https://www.nasa.gov')).toBeDefined();
  });
});
