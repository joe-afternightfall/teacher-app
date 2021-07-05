export class LibraryBookDAO {
  id: string;
  isbn: string;
  title: string;
  genre: string;
  author: string;
  gradeLevel: number | undefined;
  pages: number | undefined;

  constructor(
    id: string,
    isbn: string,
    title: string,
    genre: string,
    author: string,
    gradeLevel: number | undefined,
    pages: number | undefined
  ) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.gradeLevel = gradeLevel;
    this.pages = pages;
  }
}
