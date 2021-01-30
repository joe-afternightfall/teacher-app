import AppBar from './AppBar';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { getStore, renderWithRedux } from '../../configs/test-utils/mock-redux';

describe('App Bar Test', () => {
  it('should render with title', () => {
    const appBar = renderWithRedux(<AppBar />, getStore({}, null));

    expect(appBar.getByTestId('app-bar-title')).toBeInTheDocument();
    expect(appBar.getByText("NEW Responsive drawer")).toBeInTheDocument();
  });
});
