import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { Bookmark } from '../configs/models/Bookmark';

export default {
  reducer(
    state: BookmarksState = ({} as unknown) as BookmarksState,
    action: AnyAction
  ): BookmarksState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.LOAD_BOOKMARKS_LIST:
        newState.bookmarks = action.bookmarks;
        break;
      case actions.OPEN_NEW_BOOKMARK_DIALOG:
        newState.displayNewBookmarkDialog = true;
        break;
      case actions.CLOSE_NEW_BOOKMARK_DIALOG:
        newState.displayNewBookmarkDialog = false;
        break;
      case actions.UPDATE_BOOKMARK_URL:
        newState.url = action.value;
        break;
      case actions.UPDATE_BOOKMARK_TITLE:
        newState.title = action.value;
        break;
      case actions.UPDATE_BOOKMARK_SUBJECT_ID:
        newState.subjectId = action.value;
        break;
      case actions.CLEAR_BOOKMARK_DIALOG:
        newState.subjectId = '';
        newState.title = '';
        newState.url = '';
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface BookmarksState {
  url: string;
  title: string;
  subjectId: string;
  bookmarks: Bookmark[];
  displayNewBookmarkDialog: boolean;
}
