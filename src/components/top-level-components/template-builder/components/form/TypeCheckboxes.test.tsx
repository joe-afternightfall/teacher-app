import React from 'react';
import TypeCheckboxes from './TypeCheckboxes';
import {
  renderWithRedux,
  getTemplateBuilderStore,
} from '../../../../../configs/test-utils/mock-redux';

describe('Type Checkboxes Component', () => {
  it('should dispatch other UPDATE_ITEM_TYPE', () => {
    const store = getTemplateBuilderStore({
      lessonType: '',
    });

    const typeCheckboxes = renderWithRedux(<TypeCheckboxes />, store);

    typeCheckboxes.getByLabelText('Other').click();

    expect(store.getActions()).toEqual([
      { lessonType: 'other', type: 'UPDATE_ITEM_TYPE' },
    ]);
  });

  it('should dispatch subject UPDATE_ITEM_TYPE', () => {
    const store = getTemplateBuilderStore({
      lessonType: '',
    });

    const typeCheckboxes = renderWithRedux(<TypeCheckboxes />, store);

    typeCheckboxes.getByLabelText('Class').click();

    expect(store.getActions()).toEqual([
      { lessonType: 'subject', type: 'UPDATE_ITEM_TYPE' },
    ]);
  });

  it('should dispatch undefined UPDATE_ITEM_TYPE', () => {
    const store = getTemplateBuilderStore({
      lessonType: 'subject',
    });

    const typeCheckboxes = renderWithRedux(<TypeCheckboxes />, store);

    typeCheckboxes.getByLabelText('Class').click();

    expect(store.getActions()).toEqual([
      { lessonType: undefined, type: 'UPDATE_ITEM_TYPE' },
    ]);
  });
});
