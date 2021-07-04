export class LibraryBookDAO {
  id: string;
  isbn: string;
  title: string;
  genre: string;
  author: string;
  gradeLevel: number;
  pages: number;

  constructor(
    id: string,
    isbn: string,
    title: string,
    genre: string,
    author: string,
    gradeLevel: number,
    pages: number
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
