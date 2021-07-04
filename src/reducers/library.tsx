import { AnyAction } from 'redux';
import actions from '../creators/actions';
import { LibraryBook } from '../configs/models/LibraryBook';

export default {
  reducer(
    state: LibraryState = ({} as unknown) as LibraryState,
    action: AnyAction
  ): LibraryState {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case actions.INITIALIZE:
        newState.libraryBooks = action.libraryBooks;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface LibraryState {
  libraryBooks: LibraryBook[];
}
