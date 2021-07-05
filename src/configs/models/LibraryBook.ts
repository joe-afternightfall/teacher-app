import { LibraryBookDAO } from './LibraryBookDAO';

export class LibraryBook extends LibraryBookDAO {
  firebaseId: string;
  [key: string]: string | number | undefined;

  constructor(
    firebaseId: string,
    id: string,
    isbn: string,
    title: string,
    genre: string,
    author: string,
    gradeLevel: number | undefined,
    pages: number | undefined
  ) {
    super(id, isbn, title, genre, author, gradeLevel, pages);

    this.firebaseId = firebaseId;
  }
}
