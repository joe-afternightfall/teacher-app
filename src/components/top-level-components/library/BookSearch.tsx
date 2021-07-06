import { connect } from 'react-redux';
import React, { useState } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../configs/redux/store';
import { Button, Grid, TextField } from '@material-ui/core';
import { searchISBN } from '../../../services/library/isbn-search';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

const BookSearch = (props: BookSearchProps): JSX.Element => {
  const classes = useStyles();
  const [book, setBook] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook(e.target.value);
  };

  return (
    <Grid
      alignItems={'center'}
      justify={'center'}
      spacing={2}
      container
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <Grid item xs={8}>
        <TextField
          fullWidth
          name={'bookSearch'}
          value={book}
          onChange={handleChange}
          label={'Search By ISBN'}
        />
      </Grid>

      <Grid item xs={4} container justify={'center'}>
        <Grid item>
          <Button
            variant={'contained'}
            onClick={() => {
              props.searchHandler(book);
            }}
            disabled={book.length === 0}
          >
            {'Search'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export interface BookSearchProps {
  searchHandler: (isbn: string) => void;
}

const mapStateToProps = (state: any): BookSearchProps => {
  return ({} as unknown) as BookSearchProps;
};

const mapDispatchToProps = (dispatch: Dispatch): BookSearchProps =>
  (({
    searchHandler: (isbn: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(searchISBN(isbn));
    },
  } as unknown) as BookSearchProps);

export default connect(mapStateToProps, mapDispatchToProps)(BookSearch);
