import React from 'react';
import Select from '@material-ui/core/Select';
import { NewLinkForm } from './NewLinkDialog';
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

export default function LinkForm(props: LinkFormProps): JSX.Element {
  const classes = useStyles();

  return (
    <form>
      <Grid container>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} justify={'space-between'}>
            <Grid item xs={7}>
              <TextField
                id={'link-title'}
                label={'Title'}
                style={{ width: '100%' }}
                className={classes.textfield}
                value={props.linkValues.linkTitle}
                onChange={props.textfieldChangeHandler('linkTitle')}
                margin={'normal'}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor={'subject-dropdown'}>
                  {'Subject'}
                </InputLabel>
                <Select
                  style={{ width: '100%' }}
                  value={props.linkValues.subjectId}
                  onChange={props.dropdownChangeHandler}
                  inputProps={{
                    name: 'subjectId',
                    id: 'subject-dropdown',
                  }}
                >
                  <MenuItem value={''}>
                    <em>{'None'}</em>
                  </MenuItem>
                  {props.subjectList.map((subject: Subject, index: number) => {
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
            id={'link-url'}
            label={'URL'}
            className={classes.textfield}
            value={props.linkValues.linkUrl}
            onChange={props.textfieldChangeHandler('linkUrl')}
            margin={'normal'}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export interface LinkFormProps {
  linkValues: NewLinkForm;
  subjectList: Subject[];
  dropdownChangeHandler: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  textfieldChangeHandler: (
    name: keyof NewLinkForm
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}
