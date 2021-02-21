import React from 'react';
import {
  renderWithRedux,
  getSubjectListStore,
} from '../../../configs/test-utils/mock-redux';
import SubjectBuilderDialog from './SubjectBuilderDialog';
import { buildColor } from '../../../configs/test-utils/test-util';

describe('Subject Builder Dialog Component', () => {
  it('should dispatch CLOSE_SUBJECT_INFO_DIALOG', () => {
    const store = getSubjectListStore({
      editingForm: false,
      displayLoader: false,
      displaySubjectBuilder: true,
      selectedColor: buildColor(1)[0],
      subjectList: [],
    });

    const dialog = renderWithRedux(<SubjectBuilderDialog />, store);

    expect(dialog.getByText('Add New Subject')).toBeInTheDocument();

    dialog.getByTestId('builder-dialog-close-button').click();

    expect(store.getActions()).toEqual([{ type: 'CLOSE_SUBJECT_INFO_DIALOG' }]);
  });

  it('should render with loader', () => {
    const store = getSubjectListStore({
      editingForm: false,
      displayLoader: true,
      displaySubjectBuilder: true,
      selectedColor: buildColor(1)[0],
      subjectList: [],
    });

    const dialog = renderWithRedux(<SubjectBuilderDialog />, store);

    expect(dialog.getByText('Saving Subject Info')).toBeInTheDocument();
  });

  it('should render with Edit text', () => {
    const store = getSubjectListStore({
      editingForm: true,
      displayLoader: false,
      displaySubjectBuilder: true,
      selectedColor: buildColor(1)[0],
      subjectList: [],
    });

    const dialog = renderWithRedux(<SubjectBuilderDialog />, store);

    expect(dialog.getByText('Edit Subject Info')).toBeInTheDocument();
  });
});
