import React from 'react';
import BookmarksWidget from './BookmarksWidget';
import {
  getStore,
  renderWithRedux,
} from '../../../configs/test-utils/mock-redux';

describe('Bookmarks Widget Table', () => {
  it('should render with data', () => {
    const store = getStore({});
    const bookmarksWidget = renderWithRedux(<BookmarksWidget />, store);

    expect(bookmarksWidget.getByText('#')).toBeInTheDocument();
    expect(bookmarksWidget.getByText('Title')).toBeInTheDocument();
    expect(bookmarksWidget.getByText('URL')).toBeInTheDocument();
    expect(bookmarksWidget.getByText('Subject')).toBeInTheDocument();
    expect(bookmarksWidget.getByText('Actions')).toBeInTheDocument();

    bookmarksWidget.getByTitle('Add Bookmark').click();

    expect(store.getActions()[0].buttonTitle).toEqual('Save');
    expect(store.getActions()[0].maxWidth).toEqual('sm');
    expect(store.getActions()[0].title).toEqual('Add New Bookmark');
    expect(store.getActions()[0].titleColor).toEqual('#3baafc');
    expect(store.getActions()[0].type).toEqual('DISPLAY_APP_DIALOG');
  });
});
