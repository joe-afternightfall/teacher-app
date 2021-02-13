import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../configs/redux/store';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { updateLessonType } from '../../../../../creators/template-builder/builder';

const TypeCheckboxes = (props: TypeCheckboxesProps): JSX.Element => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      props.checkboxClickHandler(e.target.name);
    } else {
      props.checkboxClickHandler(undefined);
    }
  };

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Checkbox
            name={'other'}
            checked={props.lessonType === 'other'}
            onChange={handleCheck}
          />
        }
        label={'Other'}
      />

      <FormControlLabel
        control={
          <Checkbox
            name={'subject'}
            checked={props.lessonType === 'subject'}
            onChange={handleCheck}
          />
        }
        label={'Class'}
      />
    </React.Fragment>
  );
};

export interface TypeCheckboxesProps {
  lessonType: string;
  checkboxClickHandler: (type: string | undefined) => void;
}

const mapStateToProps = (state: State): TypeCheckboxesProps => {
  return ({
    lessonType: state.templateBuilderState.lessonType,
  } as unknown) as TypeCheckboxesProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TypeCheckboxesProps =>
  (({
    checkboxClickHandler: (type: string | undefined) => {
      dispatch(updateLessonType(type));
    },
  } as unknown) as TypeCheckboxesProps);

export default connect(mapStateToProps, mapDispatchToProps)(TypeCheckboxes);
