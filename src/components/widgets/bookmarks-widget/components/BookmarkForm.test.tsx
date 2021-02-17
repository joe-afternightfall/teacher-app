import React from 'react';
import BookmarkForm from './BookmarkForm';
import {
  getStore,
  renderWithRedux,
} from '../../../../configs/test-utils/mock-redux';

describe('Bookmark Form Component', () => {
  it('should render with stuff', () => {
    const store = getStore({});
    const bookmarkForm = renderWithRedux(
      <BookmarkForm />,
      store
    );

    expect(bookmarkForm.getByText('Bookmark Information')).toBeInTheDocument();
    expect(bookmarkForm.getByText('Title')).toBeInTheDocument();
    expect(bookmarkForm.getByTestId('bookmark-title')).toBeInTheDocument();
    expect(bookmarkForm.getByTestId('bookmark-url')).toBeInTheDocument();
  });
});
