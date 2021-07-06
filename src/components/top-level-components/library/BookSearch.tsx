import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
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
            color={'primary'}
            variant={'contained'}
            onClick={() => {
              props.searchHandler(book);
            }}
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
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(
          isbn
        )}`
      )
        .then((response) => response.json())
        .then((responseData) => {
          console.log('responseData: ' + JSON.stringify(responseData));
        });
    },
  } as unknown) as BookSearchProps);

export default connect(mapStateToProps, mapDispatchToProps)(BookSearch);
