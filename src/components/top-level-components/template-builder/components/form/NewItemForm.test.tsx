import React from 'react';
import NewItemForm from './NewItemForm';
import userEvent from '@testing-library/user-event';
import {
  renderWithRedux,
  getTemplateBuilderStore,
} from '../../../../../configs/test-utils/mock-redux';

describe('New Item Form Component', () => {
  it('should render other textfield', () => {
    const store = getTemplateBuilderStore({
      lessonType: 'other',
      lessonSubjectId: '',
      otherLessonTypeName: '',
    });
    const newItemForm = renderWithRedux(<NewItemForm />, store);

    expect(newItemForm.getByTestId('activity-field')).toBeInTheDocument();

    userEvent.type(newItemForm.getByTestId('activity-textfield'), 'other');

    expect(store.getActions()).toEqual([
      { type: 'UPDATE_OTHER_LESSON_TYPE_NAME', value: 'o' },
      { type: 'UPDATE_OTHER_LESSON_TYPE_NAME', value: 't' },
      { type: 'UPDATE_OTHER_LESSON_TYPE_NAME', value: 'h' },
      { type: 'UPDATE_OTHER_LESSON_TYPE_NAME', value: 'e' },
      { type: 'UPDATE_OTHER_LESSON_TYPE_NAME', value: 'r' },
    ]);
  });

  it('should render with subject option', () => {
    const store = getTemplateBuilderStore({
      lessonType: 'subject',
      lessonSubjectId: '',
      otherLessonTypeName: '',
    });
    const newItemForm = renderWithRedux(<NewItemForm />, store);

    expect(newItemForm.getByText('Subject')).toBeInTheDocument();
  });
});
