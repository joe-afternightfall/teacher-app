import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ActionButtons from './ActionButtons';
import {
  getSubjectListStore,
  renderWithRedux,
} from '../../../../configs/test-utils/mock-redux';

describe('Action Buttons Component', () => {
  it('should render with disabled save', () => {
    const store = getSubjectListStore({
      selectedIconId: '',
      selectedColor: {
        id: '',
        name: '',
        primaryColor: '',
        secondaryColor: '',
      },
    });

    const actionButtons = renderWithRedux(<ActionButtons />, store);

    expect(actionButtons.getByText('Save')).toBeInTheDocument();
    actionButtons.getByTestId('subject-builder-cancel-button').click();
    expect(
      actionButtons.getByTestId('subject-builder-save-button')
    ).toBeDisabled();
    expect(store.getActions()).toEqual([{ type: 'CLOSE_SUBJECT_INFO_DIALOG' }]);
  });

  it('should dispatch clear editing', () => {
    const store = getSubjectListStore({
      selectedIconId: '',
      selectedColor: {
        id: '',
        name: '',
        primaryColor: '',
        secondaryColor: '',
      },
      editingForm: true,
    });

    const actionButtons = renderWithRedux(<ActionButtons />, store);

    actionButtons.getByTestId('subject-builder-cancel-button').click();
    expect(store.getActions()).toEqual([
      {
        type: 'CLEAR_SUBJECT_INFO_DIALOG',
      },
      {
        type: 'CLEAR_EDITING',
      },
      {
        type: 'CLOSE_SUBJECT_INFO_DIALOG',
      },
    ]);
  });

  it('should render with editing', () => {
    const store = getSubjectListStore({
      selectedIconId: uuidv4(),
      selectedColor: {
        id: uuidv4(),
        name: '',
        primaryColor: '',
        secondaryColor: '',
      },
      subjectName: 'subject-name',
      subjectNameError: false,
      editingForm: true,
    });

    const actionButtons = renderWithRedux(<ActionButtons />, store);

    expect(actionButtons.getByText('Save Changes')).toBeInTheDocument();
    expect(
      actionButtons.getByTestId('subject-builder-save-button')
    ).toBeEnabled();
    actionButtons.getByTestId('subject-builder-save-button').click();
    expect(store.getActions()).toEqual([{ type: 'UPDATING_SUBJECT_INFO' }]);
  });

  // it('should dispatch save', () => {
  //   const store = getSubjectListStore({
  //     selectedIconId: uuidv4(),
  //     selectedColor: {
  //       id: uuidv4(),
  //       name: '',
  //       primaryColor: '',
  //       secondaryColor: '',
  //     },
  //     subjectName: 'subject-name',
  //     subjectNameError: false,
  //     editingForm: false,
  //   });
  //
  //   const actionButtons = renderWithRedux(<ActionButtons />, store);
  //
  //   actionButtons.getByTestId('subject-builder-save-button').click();
  // });
});
