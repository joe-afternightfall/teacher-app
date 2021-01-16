import clsx from 'clsx';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import { Grid, Tooltip } from '@material-ui/core';
import { State } from '../../../../../../../configs/redux/store';
import {
  ColorChoice,
  subjectColorChoices,
} from '../../../../../../../configs/theme/subject-color-choices';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { selectColor } from '../../../../../../../creators/subject-list/select-color';

const useStyles = makeStyles(() =>
  createStyles({
    colorChoice: {
      height: 50,
      width: '100%',
      '&:hover': {
        cursor: 'pointer',
      },
      borderColor: '#fff',
    },
    selected: {
      border: '1px solid #fff',
    },
  })
);

const ColorChoices = (props: ColorChoicesProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={5}>
      <Grid
        container
        style={{ width: '60%', margin: 'auto' }}
        justify={'center'}
      >
        {subjectColorChoices.map((choice: ColorChoice, index: number) => {
          const selectedColorName = props.selectedColorName;

          return (
            <Tooltip title={choice.name} placement={'right'} key={index}>
              <Grid
                item
                xs={3}
                className={clsx(classes.colorChoice, {
                  [classes.selected]: selectedColorName === choice.name,
                })}
                style={{
                  backgroundColor: choice.primaryColor,
                }}
                onClick={() => {
                  props.selectColorClickHandler(choice);
                }}
              >
                {selectedColorName === choice.name && (
                  <Grid
                    container
                    alignItems={'center'}
                    justify={'center'}
                    style={{ height: '100%' }}
                  >
                    <CheckIcon style={{ margin: 'auto', color: '#fff' }} />
                  </Grid>
                )}
              </Grid>
            </Tooltip>
          );
        })}
      </Grid>
    </Grid>
  );
};

export interface ColorChoicesProps {
  selectedColorName: string;
  selectColorClickHandler: (choice: ColorChoice) => void;
}

const mapStateToProps = (state: State): ColorChoicesProps => {
  return ({
    selectedColorName: state.subjectListState.selectedColor.name,
  } as unknown) as ColorChoicesProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ColorChoicesProps =>
  (({
    selectColorClickHandler: (color: ColorChoice) => {
      dispatch(selectColor(color));
    },
  } as unknown) as ColorChoicesProps);

export default connect(mapStateToProps, mapDispatchToProps)(ColorChoices);
