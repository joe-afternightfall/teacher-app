import BookmarkForm from './BookmarkForm';
import userEvent from '@testing-library/user-event';
import { getStore, renderWithRedux } from '../../../../configs/test-utils/mock-redux';

describe('Bookmark Form Component', () => {
  it('should render with stuff', () => {
    let textfieldChangeHandler = jest.fn();
    let dropdownChangeHandler = jest.fn();
    const bookmarkForm = renderWithRedux(
      <BookmarkForm
        bookmarkValues={ {
          id: 'test-id',
          bookmarkUrl: 'www.test-url.com',
          bookmarkTitle: 'test-title',
          subjectId: 'test-subject-id'
        }}
        dropdownChangeHandler={dropdownChangeHandler}
        textfieldChangeHandler={textfieldChangeHandler}
      />,
      getStore({}, null)
    );

    expect(bookmarkForm.getByText('Title')).toBeInTheDocument();
    userEvent.type(bookmarkForm.getByTestId('bookmark-title'), 'My Bookmark');
    userEvent.type(bookmarkForm.getByTestId('bookmark-url'), 'www.google.com');
    bookmarkForm.getByTestId('subject-dropdown-list').click();
    expect(textfieldChangeHandler).toHaveBeenCalledTimes(2);
  });
});
