import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import { State } from '../../../../../../configs/redux/store';
import { updateLessonType } from '../../../../../../creators/lesson-planner/lesson-type';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const TypeCheckboxes = (props: TypeCheckboxesProps): JSX.Element => {
  const classes = useStyles();

  const [checked, setChecked] = React.useState<string>('');

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setChecked(`${e.target.name}-${e.target.checked}`);
      props.checkboxClickHandler(e.target.name);
    } else {
      setChecked(`${e.target.name}-${e.target.checked}`);
      props.checkboxClickHandler(undefined);
    }
  };

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Checkbox
            name={'other'}
            checked={checked === 'other-true'}
            onChange={handleCheck}
          />
        }
        label={'Other'}
      />

      <FormControlLabel
        control={
          <Checkbox
            name={'subject'}
            checked={checked === 'subject-true'}
            onChange={handleCheck}
          />
        }
        label={'Class'}
      />
    </React.Fragment>
  );
};

export interface TypeCheckboxesProps {
  checkboxClickHandler: (type: string | undefined) => void;
}

const mapStateToProps = (state: State): TypeCheckboxesProps => {
  return ({} as unknown) as TypeCheckboxesProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TypeCheckboxesProps =>
  (({
    checkboxClickHandler: (type: string | undefined) => {
      console.log('type: ' + JSON.stringify(type));
      dispatch(updateLessonType(type));
    },
  } as unknown) as TypeCheckboxesProps);

export default connect(mapStateToProps, mapDispatchToProps)(TypeCheckboxes);
