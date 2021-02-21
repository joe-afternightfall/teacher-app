import React from 'react';
import {
  Avatar,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getIcon } from '../../../../utils/get-icon';
import { State } from '../../../../configs/redux/store';
import { updateSubjectName } from '../../../../creators/subject-list/update-subject-name';

const SubjectName = (props: SubjectNameProps) => {
  const icon = getIcon(props.selectedIconId);

  return (
    <Grid item xs={5} container>
      <Grid item xs={12}>
        <Typography variant={'h6'}>{'Subject Name'}</Typography>
      </Grid>

      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <TextField
          autoFocus
          value={props.subjectName}
          onChange={props.updateSubjectNameHandler}
          variant={'outlined'}
          data-testid={'subject-name'}
          style={{
            width: '70%',
            marginBottom: props.subjectNameError ? 0 : 22,
          }}
          error={props.subjectNameError}
          helperText={props.subjectNameError ? 'name already exists' : ''}
          inputProps={{
            'data-testid': 'subject-name-input',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position={'start'}>
                {icon !== undefined ? (
                  <Avatar
                    data-testid={'lesson-avatar'}
                    style={{ backgroundColor: props.subjectColor }}
                  >
                    {React.createElement(icon)}
                  </Avatar>
                ) : (
                  <React.Fragment />
                )}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export interface SubjectNameProps {
  subjectColor: string;
  subjectName: string;
  selectedIconId: string;
  subjectNameError: boolean;
  updateSubjectNameHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const mapStateToProps = (state: State): SubjectNameProps => {
  return ({
    subjectNameError: state.subjectListState.subjectNameError,
    subjectName: state.subjectListState.subjectName,
    subjectColor: state.subjectListState.selectedColor.primaryColor,
    selectedIconId: state.subjectListState.selectedIconId,
  } as unknown) as SubjectNameProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SubjectNameProps =>
  (({
    updateSubjectNameHandler: (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateSubjectName(event.target.value));
    },
  } as unknown) as SubjectNameProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectName);
