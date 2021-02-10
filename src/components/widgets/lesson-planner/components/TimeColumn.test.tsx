import * as React from 'react';
import TimeColumn from './TimeColumn';
import { render } from '@testing-library/react';

describe('Time Column Component', () => {
  it('should render with values', () => {
    const timeColumn = render(<TimeColumn />);

    expect(timeColumn.getByText('8:30 - 9:00 am')).toBeInTheDocument();
    expect(timeColumn.getByText('9:00 - 9:30 am')).toBeInTheDocument();
    expect(timeColumn.getByText('9:30 - 10:00 am')).toBeInTheDocument();
    expect(timeColumn.getByText('10:00 - 10:30 am')).toBeInTheDocument();
    expect(timeColumn.getByText('10:30 - 11:00 am')).toBeInTheDocument();
    expect(timeColumn.getByText('11:00 - 11:30 am')).toBeInTheDocument();
    expect(timeColumn.getByText('11:30 - 12:00 pm')).toBeInTheDocument();
  });
});
