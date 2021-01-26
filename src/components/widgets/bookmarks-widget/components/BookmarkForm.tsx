import React from 'react';
import { NewBookmarkForm } from './NewBookmarkDialog';
import { Grid, TextField } from '@material-ui/core';
import { Subject } from '../../../../configs/types/Subject';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SubjectDropdown from '../../subject-related/subject-dropdown/SubjectDropdown';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: 160,
    },
    textfield: {
      minWidth: '100%',
    },
  })
);

export default function BookmarkForm(props: BookmarkFormProps): JSX.Element {
  const classes = useStyles();

  return (
    <form>
      <Grid container>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} justify={'space-between'}>
            <Grid item xs={7}>
              <TextField
                id={'bookmark-title'}
                label={'Title'}
                style={{ width: '100%' }}
                className={classes.textfield}
                value={props.bookmarkValues.bookmarkTitle}
                onChange={props.textfieldChangeHandler('bookmarkTitle')}
                margin={'normal'}
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
            id={'bookmark-url'}
            label={'URL'}
            className={classes.textfield}
            value={props.bookmarkValues.bookmarkUrl}
            onChange={props.textfieldChangeHandler('bookmarkUrl')}
            margin={'normal'}
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
