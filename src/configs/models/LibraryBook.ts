import { LibraryBookDAO } from './LibraryBookDAO';

export class LibraryBook extends LibraryBookDAO {
  firebaseId: string;
  [key: string]: string | number;

  constructor(
    firebaseId: string,
    id: string,
    isbn: string,
    title: string,
    genre: string,
    author: string,
    gradeLevel: number,
    pages: number
  ) {
    super(
      id,
      isbn,
      title,
      genre,
      author,
      gradeLevel,
      pages
    );

    this.firebaseId = firebaseId;
  }
}