import React from 'react';
import { connect } from 'react-redux';
import PreviewCard from './components/PreviewCard';
import { Grid, Typography } from '@material-ui/core';
import { State } from '../../../../../../configs/redux/store';
import ColorChoices, { ColorChoicesProps } from './components/ColorChoices';

const ColorSelector = (props: ColorSelectorProps) => {
  return (
    <Grid item xs={12} container>
      <Grid item xs={12} container alignItems={'flex-end'}>
        <Grid item>
          <Typography variant={'h6'}>
            {`Subject Color: ${props.selectedColorName}`}
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems={'center'} spacing={2}>
        <ColorChoices />

        <PreviewCard />
      </Grid>
    </Grid>
  );
};

export interface ColorSelectorProps {
  selectedColorName: string;
}

const mapStateToProps = (state: State): ColorSelectorProps => {
  return ({
    selectedColorName: state.subjectListState.selectedColor.name,
  } as unknown) as ColorChoicesProps;
};

export default connect(mapStateToProps)(ColorSelector);
