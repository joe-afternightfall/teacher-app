import { loadBookmarksList } from './load-bookmarks';
import { v4 as uuidv4 } from 'uuid';
import actions from '../actions';

describe('links creators', () => {
  const bookmarks = [
    {
      firebaseId: uuidv4(),
      id: uuidv4(),
      bookmarkUrl: uuidv4(),
      bookmarkTitle: uuidv4(),
      subjectId: uuidv4(),
      plannerItemIds: [uuidv4()],
    },
  ];
  it('should return LOAD_BOOKMARKS_LIST action', () => {
    const loadedTopics = loadBookmarksList(bookmarks);

    expect(loadedTopics).toEqual({
      type: actions.LOAD_BOOKMARKS_LIST,
      bookmarks: bookmarks,
    });
  });
});
