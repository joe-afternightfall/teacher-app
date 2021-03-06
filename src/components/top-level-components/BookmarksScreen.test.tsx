import React from 'react';
import BookmarksScreen from './BookmarksScreen';
import { getStore, renderWithRedux } from '../../configs/test-utils/mock-redux';

describe('Bookmarks Screen Component', () => {
  it('should render with data', () => {
    const bookmarksScreen = renderWithRedux(<BookmarksScreen />, getStore({}));

    expect(bookmarksScreen.getByText('Bookmarks')).toBeInTheDocument();
    expect(bookmarksScreen.getByText('#')).toBeInTheDocument();
    expect(bookmarksScreen.getByText('Title')).toBeInTheDocument();
    expect(bookmarksScreen.getByText('URL')).toBeInTheDocument();
    expect(bookmarksScreen.getByText('Subject')).toBeInTheDocument();
  });
});
