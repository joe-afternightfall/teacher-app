import React from 'react';
import {
  Grid,
  InputAdornment,
  SvgIconTypeMap,
  TextField,
  Typography,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { updateSubjectName } from '../../../../../../creators/subject-list';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const SubjectName = (props: SubjectNameProps) => {
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
                {React.createElement(props.selectedIcon)}
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
  selectedIcon: OverridableComponent<SvgIconTypeMap>;
  updateSubjectNameHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const mapStateToProps = (state: State): SubjectNameProps => {
  return ({
    subjectName: state.subjectListState.subjectName,
    selectedIcon: state.subjectListState.selectedIcon,
  } as unknown) as SubjectNameProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SubjectNameProps =>
  (({
    updateSubjectNameHandler: (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateSubjectName(event.target.value));
    },
  } as unknown) as SubjectNameProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectName);
