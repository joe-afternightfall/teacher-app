import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import {
  displaySearchingForBookLoader,
  foundBookInfo,
} from '../../creators/library-books/isbn-search';
import { LibraryBook } from '../../configs/models/LibraryBook';

function checkResponse(res: Response): Response {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res;
}

export const searchISBN = (
  isbn: string
): ThunkAction<void, State, void, AnyAction> => async (
  dispatch: Dispatch,
  getState: () => State
): Promise<void> => {
  dispatch(displaySearchingForBookLoader());

  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(
      isbn
    )}`
  )
    .then(checkResponse)
    .then((res) => res.json())
    .then((data) => {
      console.log(
        'data.items[0].volumeInfo: ' + JSON.stringify(data.items[0].volumeInfo)
      );

      const foundBook = data.items[0].volumeInfo;
      const book = new LibraryBook(
        '',
        '',
        isbn,
        foundBook.title,
        foundBook.categories[0],
        foundBook.authors[0],
        undefined,
        foundBook.pageCount
      );
      dispatch(foundBookInfo(book));
      return;
    });
};
