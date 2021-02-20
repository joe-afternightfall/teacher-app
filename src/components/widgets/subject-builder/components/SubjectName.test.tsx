import React from 'react';
import SubjectName from './SubjectName';
import {
  getSubjectListStore,
  renderWithRedux,
} from '../../../../configs/test-utils/mock-redux';
import { buildColor } from '../../../../configs/test-utils/test-util';
import userEvent from '@testing-library/user-event';

describe('Subject Name Component', () => {
  it('should render with error text', () => {
    const subjectName = renderWithRedux(
      <SubjectName />,
      getSubjectListStore({
        subjectNameError: true,
        subjectName: '',
        selectedColor: buildColor(1)[0],
        selectedIconId: '',
      })
    );

    expect(subjectName.getByText('name already exists'));
  });

  it('should render with text', () => {
    const store = getSubjectListStore({
      subjectNameError: true,
      subjectName: '',
      selectedColor: buildColor(1)[0],
      selectedIconId: '',
    });

    const subjectName = renderWithRedux(<SubjectName />, store);

    userEvent.type(subjectName.getByTestId('subject-name'), 'blah');
    expect(subjectName.getByText('name already exists')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    const store = getSubjectListStore({
      subjectNameError: true,
      subjectName: '',
      selectedColor: buildColor(1)[0],
      selectedIconId: 'c9adb6f1-f832-4186-a7db-40cc2cd8706c',
    });

    const subjectName = renderWithRedux(<SubjectName />, store);

    expect(subjectName.getByTestId('lesson-avatar')).toBeInTheDocument();
  });

  it('should render', () => {
    const store = getSubjectListStore({
      subjectNameError: true,
      subjectName: '',
      selectedColor: buildColor(1)[0],
      selectedIconId: 'c9adb6f1-f832-4186-a7db-40cc2cd8706c',
    });

    const subjectName = renderWithRedux(<SubjectName />, store);

    userEvent.type(subjectName.getByTestId('subject-name-input'), 'typing');

    expect(store.getActions()).toEqual([
      { subjectName: 't', type: 'UPDATE_SUBJECT_NAME' },
      { subjectName: 'y', type: 'UPDATE_SUBJECT_NAME' },
      { subjectName: 'p', type: 'UPDATE_SUBJECT_NAME' },
      { subjectName: 'i', type: 'UPDATE_SUBJECT_NAME' },
      { subjectName: 'n', type: 'UPDATE_SUBJECT_NAME' },
      { subjectName: 'g', type: 'UPDATE_SUBJECT_NAME' },
    ]);
  });
});
