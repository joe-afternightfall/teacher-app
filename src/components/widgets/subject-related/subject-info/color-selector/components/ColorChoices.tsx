import clsx from 'clsx';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  ColorChoice,
  subjectColorChoices,
} from '../../../../../../configs/theme/subject-color-choices';
import { State } from '../../../../../../configs/redux/store';
import { selectColor } from '../../../../../../creators/subject-list/select-color';
import { Subject } from '../../../../../../configs/types/Subject';

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
    chosen: {
      border: '1px solid #000',
      opacity: 0.5,
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
          const found = props.chosenColors.some((colorId) => {
            return colorId === choice.id;
          });

          return (
            <Tooltip
              key={index}
              placement={'right'}
              title={found ? 'Taken' : choice.name}
            >
              <Grid
                item
                xs={3}
                className={clsx(classes.colorChoice, {
                  [classes.selected]: selectedColorName === choice.name,
                  [classes.chosen]: found,
                })}
                style={{
                  backgroundColor: choice.primaryColor,
                }}
                onClick={() =>
                  found ? undefined : props.selectColorClickHandler(choice)
                }
              >
                {found ? (
                  <Grid
                    container
                    alignItems={'center'}
                    justify={'center'}
                    style={{ height: '100%' }}
                  >
                    <CheckIcon style={{ margin: 'auto', color: '#000' }} />
                  </Grid>
                ) : (
                  selectedColorName === choice.name && (
                    <Grid
                      container
                      alignItems={'center'}
                      justify={'center'}
                      style={{ height: '100%' }}
                    >
                      <CheckIcon style={{ margin: 'auto', color: '#fff' }} />
                    </Grid>
                  )
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
  chosenColors: string[];
  selectedColorName: string;
  selectColorClickHandler: (choice: ColorChoice) => void;
}

const mapStateToProps = (state: State): ColorChoicesProps => {
  const subjectList = state.subjectListState.subjectList;
  const chosenColors = subjectList.map((subject: Subject) => {
    return subject.primaryColorId;
  });

  return ({
    chosenColors: chosenColors,
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
