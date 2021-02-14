import React from 'react';
import SubjectDropdown from './SubjectDropdown';
import { getStore, renderWithRedux } from '../../configs/test-utils/mock-redux';

describe('Subject Dropdown Component', () => {
  it('should render with list', () => {
    const changeHandler = jest.fn();

    const subjectDropdown = renderWithRedux(
      <SubjectDropdown value={''} changeHandler={changeHandler} />,
      getStore({})
    );

    expect(subjectDropdown.getByLabelText('Subject')).toBeInTheDocument();
    expect(subjectDropdown.getByTestId('subject-dropdown')).toBeInTheDocument();
    subjectDropdown.getByTestId('subject-dropdown-list').click();
  });
});
