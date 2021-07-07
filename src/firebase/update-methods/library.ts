import { Store } from 'redux';
import { getLibraryBooks } from '../../services/library/get-library-book';
import { loadLibraryBooks } from '../../creators/library-books/book-info';
import { LibraryBook } from '../../configs/models/LibraryBook';

export const updateLibraryBooks = async (store: Store): Promise<void> => {
  const booksList = await getLibraryBooks();
  if (booksList !== undefined && booksList !== null) {
    const books = Object.keys(booksList).map(
      (key: string): LibraryBook => {
        return {
          firebaseId: key,
          id: booksList[key].id,
          isbn: booksList[key].isbn,
          title: booksList[key].title,
          genre: booksList[key].genre,
          author: booksList[key].author,
          gradeLevel: booksList[key].gradeLevel,
          pages: booksList[key].pages,
        };
      }
    );

    store.dispatch(loadLibraryBooks(books));
  } else {
    store.dispatch(loadLibraryBooks([]));
  }
};
