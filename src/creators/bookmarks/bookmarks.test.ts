import actions from '../actions';
import { buildBookmarkList } from '../../configs/test-utils/test-util';
import { loadBookmarksList, updateBookmarkSubject, updateBookmarkTitle, updateBookmarkUrl } from './bookmarks';

describe('bookmarks creators', () => {
  it('should return LOAD_BOOKMARKS_LIST action', () => {
    const bookmarks = buildBookmarkList(2);
    const loadedTopics = loadBookmarksList(bookmarks);

    expect(loadedTopics).toEqual({
      type: actions.LOAD_BOOKMARKS_LIST,
      bookmarks: bookmarks,
    });
  });

  it('should return UPDATE_BOOKMARK_SUBJECT_ID', () => {
    const response = updateBookmarkSubject('test-subject');

    expect(response).toEqual({
      type: actions.UPDATE_BOOKMARK_SUBJECT_ID,
      value: 'test-subject',
    })
  });

  it('should return UPDATE_BOOKMARK_URL', () => {
    const response = updateBookmarkUrl('test-url');

    expect(response).toEqual({
      type: actions.UPDATE_BOOKMARK_URL,
      value: 'test-url',
    })
  });

  it('should return UPDATE_BOOKMARK_TITLE', () => {
    const response = updateBookmarkTitle('test-title');

    expect(response).toEqual({
      type: actions.UPDATE_BOOKMARK_TITLE,
      value: 'test-title',
    })
  });
});
