import React from 'react';
import { getStore, renderWithRedux } from '../../configs/test-utils/mock-redux';
import SubjectDropdown from './SubjectDropdown';
import { buildSubjectList } from '../../configs/test-utils/test-util';

describe('Subject Dropdown Component', () => {
  it('should render with list', () => {
    const changeHandler = jest.fn();
    const subjects = buildSubjectList(4);

    const subjectDropdown = renderWithRedux(
      <SubjectDropdown value={''} changeHandler={changeHandler} />,
      getStore({})
    );

    expect(subjectDropdown.getByLabelText('Subject')).toBeInTheDocument();
    expect(subjectDropdown.getByTestId('subject-dropdown')).toBeInTheDocument();
    subjectDropdown.getByTestId('subject-dropdown-list').click();
  });
});
