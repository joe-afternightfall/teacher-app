import actions from '../actions';
import { loadBookmarksList } from './load-bookmarks';
import { buildBookmarkList } from '../../configs/test-utils/test-util';

describe('bookmarks creators', () => {
  it('should return LOAD_BOOKMARKS_LIST action', () => {
    const bookmarks = buildBookmarkList(2);
    const loadedTopics = loadBookmarksList(bookmarks);

    expect(loadedTopics).toEqual({
      type: actions.LOAD_BOOKMARKS_LIST,
      bookmarks: bookmarks,
    });
  });
});
