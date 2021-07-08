import React from 'react';
import { BookFormState } from './LibraryBookForm';
import { Grid, TextField } from '@material-ui/core';
import { capitalizeAndSplitString } from '../../../utils/string-formatter';

export default function BookInfo(props: BookInfoProps): JSX.Element {
  return (
    <>
      {props.fieldsToRender.map((field: string, index: number) => {
        return (
          <Grid item xs={6} key={index}>
            <TextField
              fullWidth
              name={field}
              label={capitalizeAndSplitString(field)}
              margin={'normal'}
              data-testid={`book-${field}`}
              value={props.info && props.info[field]}
              onChange={props.changeHandler}
              style={{ marginBottom: 0 }}
              onBlur={props.blurHandler}
            />
          </Grid>
        );
      })}
    </>
  );
}

export interface BookInfoProps {
  info: BookFormState;
  fieldsToRender: string[];
  blurHandler: () => void;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
