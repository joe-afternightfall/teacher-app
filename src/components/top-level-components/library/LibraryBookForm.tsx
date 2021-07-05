import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../configs/redux/store';
import { LibraryBook } from '../../../configs/models/LibraryBook';
import { updateBookInfo } from '../../../creators/library-books/update-book-info';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

interface BookFormState {
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
      <Grid item>
        <Typography variant={'h6'}>{'Library Book Information'}</Typography>
      </Grid>

      <form>
        <Grid container spacing={2}>
          {fieldsToRender.map((field: string, index: number) => {
            return (
              <Grid item xs={6} key={index}>
                <TextField
                  fullWidth
                  name={field}
                  label={field}
                  margin={'normal'}
                  data-testid={`book-${field}`}
                  value={state[field]}
                  onChange={handleChange}
                  style={{ marginBottom: 0 }}
                  onBlur={handleBlur}
                />
              </Grid>
            );
          })}
        </Grid>
      </form>
    </Grid>
  );
};

export interface LibraryBookFormProps {
  book: LibraryBook;
  blurHandler: (book: LibraryBook) => void;
}

const mapStateToProps = (state: State): LibraryBookFormProps => {
  return ({
    book: state.libraryBookState.currentBook,
  } as unknown) as LibraryBookFormProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LibraryBookFormProps =>
  (({
    blurHandler: (book: LibraryBook) => {
      dispatch(updateBookInfo(book));
    },
  } as unknown) as LibraryBookFormProps);

export default connect(mapStateToProps, mapDispatchToProps)(LibraryBookForm);
