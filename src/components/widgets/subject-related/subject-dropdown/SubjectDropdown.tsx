import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { State } from '../../../../configs/redux/store';
import FormControl from '@material-ui/core/FormControl';
import { Subject } from '../../../../configs/models/Subject';

const SubjectDropdown = (props: SubjectDropdownProps): JSX.Element => {
  return (
    <FormControl style={{ width: '100%' }} data-testId={'subject-dropdown'}>
      <InputLabel htmlFor={'subject-dropdown'}>{'Subject'}</InputLabel>
      <Select
        value={props.value}
        onChange={props.changeHandler}
        style={{ width: '100%' }}
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
  );
};

export interface SubjectDropdownProps {
  value: string;
  subjectList: Subject[];
  changeHandler: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
}

const mapStateToProps = (state: State, ownProps: any): SubjectDropdownProps => {
  return ({
    subjectList: state.subjectListState.subjectList
      ? state.subjectListState.subjectList
      : [],
  } as unknown) as SubjectDropdownProps;
};

export default connect(mapStateToProps)(SubjectDropdown);
