import actions from '../../creators/actions';
import { updateBookmarks } from './bookmarks';
import { getStore } from '../../configs/test-utils/mock-redux';
import { buildBookmarkDAOList } from '../../configs/test-utils/test-util';
import { getBookmarksList } from '../../services/bookmarks/get-bookmarks';

jest.mock('../../services/bookmarks/get-bookmarks');
const getBookmarksListMock = getBookmarksList as jest.Mock;

describe('bookmarks util', () => {
  const builtBookmarks = buildBookmarkDAOList(4);

  it('should return bookmarks', async () => {
    const store = getStore({});

    getBookmarksListMock.mockResolvedValue(builtBookmarks);

    const expected = builtBookmarks.map((bookmark, index) => {
      return {
        firebaseId: index.toString(),
        id: bookmark.id,
        bookmarkUrl: bookmark.bookmarkUrl,
        bookmarkTitle: bookmark.bookmarkTitle,
        subjectId: bookmark.subjectId,
        plannerItemIds: bookmark.plannerItemIds,
      };
    });

    await updateBookmarks(store);

    expect(store.getActions()).toEqual([
      {
        type: actions.LOAD_BOOKMARKS_LIST,
        bookmarks: expected,
      },
    ]);
  });

  it('should dispatch empty array when null', async () => {
    const store = getStore({});

    getBookmarksListMock.mockResolvedValue(null);

    await updateBookmarks(store);

    expect(store.getActions()).toEqual([
      {
        type: actions.LOAD_BOOKMARKS_LIST,
        bookmarks: [],
      },
    ]);
  });

  it('should dispatch empty array when undefined', async () => {
    const store = getStore({});

    getBookmarksListMock.mockResolvedValue(undefined);

    await updateBookmarks(store);

    expect(store.getActions()).toEqual([
      {
        type: actions.LOAD_BOOKMARKS_LIST,
        bookmarks: [],
      },
    ]);
  });
});
