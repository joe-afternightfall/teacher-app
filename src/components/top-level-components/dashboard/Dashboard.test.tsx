import React from 'react';
import {
  getStore,
  renderWithRedux,
} from '../../../configs/test-utils/mock-redux';
import DashboardScreen from './DashboardScreen';

describe('Dashboard Component', () => {
  it('should render dashboard', () => {
    const dashboard = renderWithRedux(<DashboardScreen />, getStore({}));

    expect(dashboard.getByTestId('subject-list')).toBeInTheDocument();
    expect(
      dashboard.getByTestId('template-builder-hot-key')
    ).toBeInTheDocument();
    expect(dashboard.getByTestId('bookmarks-hot-key')).toBeInTheDocument();
    expect(dashboard.getByTestId('empty-hot-key')).toBeInTheDocument();
  });
});
