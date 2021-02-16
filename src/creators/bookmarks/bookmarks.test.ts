import actions from '../actions';
import { buildBookmarkList } from '../../configs/test-utils/test-util';
import { loadBookmarksList } from './bookmarks';

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
