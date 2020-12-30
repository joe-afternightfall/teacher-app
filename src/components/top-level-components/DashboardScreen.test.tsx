import * as React from 'react';
import DashboardScreen from './DashboardScreen';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Dashboard Screen', () => {
  it('should render with default title', () => {
    const dashboard = render(<DashboardScreen />);

    expect(dashboard.getByText('TEACHER-APP')).toBeInTheDocument();
  });
});
