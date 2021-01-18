import * as React from 'react';
import DashboardScreen from './DashboardScreen';
import '@testing-library/jest-dom/extend-expect';
import {
  getStore,
  renderWithRedux,
} from '../../../configs/test-utils/mock-redux';

describe('Dashboard Screen', () => {
  it('should render with default title', () => {
    const dashboard = renderWithRedux(<DashboardScreen />, getStore({}, null));

    expect(dashboard.getByText('Monday')).toBeInTheDocument();
  });
});
