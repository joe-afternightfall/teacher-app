import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { NewBookmarkForm } from './NewBookmarkDialog';
import SubjectDropdown from '../../../shared/SubjectDropdown';

export default function BookmarkForm(props: BookmarkFormProps): JSX.Element {
  return (
    <form>
      <Grid container>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} justify={'space-between'}>
            <Grid item xs={7}>
              <TextField
                fullWidth
                label={'Title'}
                margin={'normal'}
                data-testid={'bookmark-title'}
                value={props.bookmarkValues.bookmarkTitle}
                onChange={props.textfieldChangeHandler('bookmarkTitle')}
              />
            </Grid>

            <Grid item xs={4}>
              <SubjectDropdown
                value={props.bookmarkValues.subjectId}
                changeHandler={props.dropdownChangeHandler}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label={'URL'}
            margin={'normal'}
            data-testid={'bookmark-url'}
            value={props.bookmarkValues.bookmarkUrl}
            onChange={props.textfieldChangeHandler('bookmarkUrl')}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export interface BookmarkFormProps {
  bookmarkValues: NewBookmarkForm;
  dropdownChangeHandler: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  textfieldChangeHandler: (
    name: keyof NewBookmarkForm
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}
