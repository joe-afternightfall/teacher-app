import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Subject } from '../../../configs/types/Subject';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class SubjectDropdown extends Component<SubjectDropdownProps> {
  render(): JSX.Element {
    const { value, subjectList, changeHandler } = this.props;

    return (
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor={'subject-dropdown'}>{'Subject'}</InputLabel>
        <Select
          value={value}
          onChange={changeHandler}
          style={{ width: '100%' }}
          inputProps={{
            name: 'subjectId',
            id: 'subject-dropdown',
          }}
        >
          <MenuItem value={''}>
            <em>{'None'}</em>
          </MenuItem>
          {subjectList.map((subject: Subject, index: number) => {
            return (
              <MenuItem key={index} value={subject.id}>
                {subject.subjectName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export interface SubjectDropdownProps extends WithStyles<typeof styles> {
  value: string;
  subjectList: Subject[];
  changeHandler: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
}

export default withStyles(styles, { withTheme: true })(SubjectDropdown);
