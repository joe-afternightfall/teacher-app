import React from 'react';
import {
  getStore,
  renderWithRedux,
} from '../../../configs/test-utils/mock-redux';
import DeleteItemDialog from './DeleteItemDialog';
import { buildLessonItems } from '../../../configs/test-utils/test-util';

describe('Delete Item Dialog Component', () => {
  it('should return component', () => {
    const store = getStore({});
    const deleteDialog = renderWithRedux(
      <DeleteItemDialog item={buildLessonItems(1)[0]} day={'monday'} />,
      store
    );

    deleteDialog.getByTestId('delete-button-test-id-1').click();

    expect(store.getActions()[0].type).toEqual('DISPLAY_APP_DIALOG');
    expect(store.getActions()[0].buttonTitle).toEqual('Delete');
    expect(store.getActions()[0].maxWidth).toEqual('sm');
    expect(store.getActions()[0].titleColor).toEqual('');
    expect(store.getActions()[0].title).toEqual('');
  });
});
