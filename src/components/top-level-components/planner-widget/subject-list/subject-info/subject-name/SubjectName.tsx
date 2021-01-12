import React from 'react';
import {
  Avatar,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { updateSubjectName } from '../../../../../../creators/subject-list';
import { getIcon } from '../../../../../../utils/get-icon';

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
          style={{ width: '70%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position={'start'}>
                {icon !== undefined ? (
                  <Avatar>{React.createElement(icon)}</Avatar>
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
  subjectName: string;
  selectedIconId: string;
  updateSubjectNameHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const mapStateToProps = (state: State): SubjectNameProps => {
  return ({
    subjectName: state.subjectListState.subjectName,
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
