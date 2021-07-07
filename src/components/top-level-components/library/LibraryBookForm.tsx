import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../configs/redux/store';
import { LibraryBook } from '../../../configs/models/LibraryBook';
import { updateBookInfo } from '../../../creators/library-books/book-info';
import BookSearch from './BookSearch';
import BookInfo from './BookInfo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export interface BookFormState {
  [key: string]: string | undefined | number;
  firebaseId: string;
  id: string;
  title: string;
  author: string;
  genre: string;
  gradeLevel: number | undefined;
  pages: number | undefined;
  isbn: string;
}

const LibraryBookForm = (props: LibraryBookFormProps): JSX.Element => {
  const classes = useStyles();
  const [display, setDisplay] = useState<boolean>(false);

  const [state, setState] = useState<BookFormState>({
    firebaseId: props.book ? props.book.firebaseId : '',
    id: props.book ? props.book.id : '',
    title: props.book ? props.book.title : '',
    author: props.book ? props.book.author : '',
    genre: props.book ? props.book.genre : '',
    gradeLevel: props.book ? props.book.gradeLevel : undefined,
    pages: props.book ? props.book.pages : undefined,
    isbn: props.book ? props.book.isbn : '',
  });

  useEffect(() => {
    setDisplay(props.displayLoader);
    setState(props.book);
  }, [props.displayLoader, props.book]);

  const fieldsToRender = [
    'title',
    'author',
    'genre',
    'gradeLevel',
    'pages',
    'isbn',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    props.blurHandler(state);
  };

  return (
    <Grid
      container
      justify={'center'}
      alignItems={'center'}
      style={{ margin: '24px 0' }}
    >
      <Grid item xs={12}>
        <BookSearch />
      </Grid>

      <form>
        <Grid
          container
          alignItems={'center'}
          spacing={2}
          style={{ minHeight: '40vh' }}
        >
          {display ? (
            <Grid item>
              <CircularProgress />
            </Grid>
          ) : (
            <BookInfo
              info={state}
              fieldsToRender={fieldsToRender}
              blurHandler={handleBlur}
              changeHandler={handleChange}
            />
          )}
        </Grid>
      </form>
    </Grid>
  );
};

export interface LibraryBookFormProps {
  book: LibraryBook;
  blurHandler: (book: LibraryBook) => void;
  displayLoader: boolean;
  bookInfoError: boolean;
}

const mapStateToProps = (state: State): LibraryBookFormProps => {
  return ({
    book: state.libraryBookState.currentBook,
    displayLoader: state.libraryBookState.displaySearchingLoader,
    bookInfoError: state.libraryBookState.bookInfoError,
  } as unknown) as LibraryBookFormProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LibraryBookFormProps =>
  (({
    blurHandler: (book: LibraryBook) => {
      dispatch(updateBookInfo(book));
    },
  } as unknown) as LibraryBookFormProps);

export default connect(mapStateToProps, mapDispatchToProps)(LibraryBookForm);
