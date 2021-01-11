import clsx from 'clsx';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { Grid, Tooltip } from '@material-ui/core';
import {
  ColorChoice,
  subjectColorChoices,
} from '../../../../../../../configs/theme/subject-color-choices';
import { State } from '../../../../../../../configs/redux/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { selectColor } from '../../../../../../../creators/subject-list';

const useStyles = makeStyles((theme: Theme) =>
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
                  backgroundColor: choice.color,
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
