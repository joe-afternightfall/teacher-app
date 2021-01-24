import actions from '../actions';
import { closeNewBookmarkDialog, openNewBookmarkDialog } from './bookmarks-dialog';

describe('bookmarks dialog actions', () => {
  it('should return CLOSE_NEW_BOOKMARK_DIALOG', () => {
    const response = closeNewBookmarkDialog();

    expect(response).toEqual({
      type: actions.CLOSE_NEW_BOOKMARK_DIALOG,
    });
  });

  it('should return OPEN_NEW_BOOKMARK_DIALOG', () => {
    const response = openNewBookmarkDialog();

    expect(response).toEqual({
      type: actions.OPEN_NEW_BOOKMARK_DIALOG,
    });
  });
});
