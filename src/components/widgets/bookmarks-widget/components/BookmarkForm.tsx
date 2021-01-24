import React from 'react';
import Select from '@material-ui/core/Select';
import { NewBookmarkForm } from './NewBookmarkDialog';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Subject } from '../../../../configs/types/Subject';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor={'subject-dropdown'}>
                  {'Subject'}
                </InputLabel>

                {/*// todo:  rip select out and use subject name dropdown}*/}
                <Select
                  style={{ width: '100%' }}
                  value={props.bookmarkValues.subjectId}
                  onChange={props.dropdownChangeHandler}
                  inputProps={{
                    name: 'subjectId',
                    id: 'subject-dropdown',
                  }}
                >
                  <MenuItem value={''}>
                    <em>{'None'}</em>
                  </MenuItem>
                  {props.subjectList &&
                    props.subjectList.map((subject: Subject, index: number) => {
                      return (
                        <MenuItem key={index} value={subject.id}>
                          {subject.subjectName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
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
  subjectList: Subject[];
  dropdownChangeHandler: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  textfieldChangeHandler: (
    name: keyof NewBookmarkForm
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}
