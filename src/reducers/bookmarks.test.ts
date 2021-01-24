import bookmarks from './bookmarks';
import actions from '../creators/actions';
import { buildBookmarkList } from '../configs/test-utils/test-util';

describe('bookmarks reducer', () => {
  const bookmarksList = buildBookmarkList(3);

  it('should return bookmarks', () => {
    const response = bookmarks.reducer(undefined, {
      type: actions.LOAD_BOOKMARKS_LIST,
      bookmarks: bookmarksList,
    });

    expect(response).toEqual({
      bookmarks: bookmarksList,
    });
  });

  it('should return OPEN_NEW_BOOKMARK_DIALOG action', () => {
    const response = bookmarks.reducer(undefined, {
      type: actions.OPEN_NEW_BOOKMARK_DIALOG,
    });

    expect(response).toEqual({
      displayNewBookmarkDialog: true,
    });
  });

  it('should return CLOSE_NEW_BOOKMARK_DIALOG action', () => {
    const response = bookmarks.reducer(undefined, {
      type: actions.CLOSE_NEW_BOOKMARK_DIALOG,
    });

    expect(response).toEqual({
      displayNewBookmarkDialog: false,
    });
  });

  it('should return default state', () => {
    const response = bookmarks.reducer(undefined, {
      type: 'TESTING',
    });

    expect(response).toEqual({});
  });
});
