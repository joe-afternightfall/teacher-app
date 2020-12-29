import * as React from "react";
import AppBar from './AppBar';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('App Bar Test', () => {
  it('should render with title', () => {
    const appBar = render(<AppBar />);

    expect(appBar.getByTestId('app-bar-title')).toBeInTheDocument();
    expect(appBar.getByText("Jamie's Teacher App")).toBeInTheDocument();
  });
});
