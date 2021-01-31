import { Store } from 'redux';
import { getBookmarksList } from '../../services/bookmarks/get-bookmarks';
import { loadBookmarksList } from '../../creators/bookmarks/load-bookmarks';

export const updateBookmarks = async (store: Store) => {
  const bookmarksList = await getBookmarksList();
  if (bookmarksList !== undefined && bookmarksList !== null) {
    const bookmarks = Object.keys(bookmarksList).map((key) => {
      return {
        firebaseId: key,
        id: bookmarksList[key].id,
        bookmarkUrl: bookmarksList[key].bookmarkUrl,
        bookmarkTitle: bookmarksList[key].bookmarkTitle,
        subjectId: bookmarksList[key].subjectId,
        plannerItemIds: bookmarksList[key].plannerItemIds,
      };
    });

    store.dispatch(loadBookmarksList(bookmarks));
  } else {
    store.dispatch(loadBookmarksList([]));
  }
};
