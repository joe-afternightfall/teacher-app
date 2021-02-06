import { Store } from 'redux';
import { getBookmarksList } from '../../services/bookmarks/get-bookmarks';
import { loadBookmarksList } from '../../creators/bookmarks/load-bookmarks';
import { Bookmark } from '../../configs/models/Bookmark';

export const updateBookmarks = async (store: Store) => {
  const bookmarksList = await getBookmarksList();
  if (bookmarksList !== undefined && bookmarksList !== null) {
    const bookmarks = Object.keys(bookmarksList).map(
      (key: string): Bookmark => {
        return {
          firebaseId: key,
          id: bookmarksList[key].id,
          bookmarkUrl: bookmarksList[key].bookmarkUrl,
          bookmarkTitle: bookmarksList[key].bookmarkTitle,
          subjectId: bookmarksList[key].subjectId,
          plannerItemIds: bookmarksList[key].plannerItemIds,
        };
      }
    );

    store.dispatch(loadBookmarksList(bookmarks));
  } else {
    store.dispatch(loadBookmarksList([]));
  }
};
