import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  SubjectIcon,
  subjectIcons,
} from '../../../../../../configs/theme/subject-icon-choices';
import { State } from '../../../../../../configs/redux/store';
import { selectIcon } from '../../../../../../creators/subject-list';
import { Grid, Paper, SvgIconTypeMap, Typography } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const IconSelector = (props: IconSelectorProps) => {
  const [isHovering, setIsHovering] = React.useState<string>('');

  const handleHover = (id: string) => (event: any) => {
    setIsHovering(id);
  };

  return (
    <Grid item xs={7} container>
      <Grid item xs={12}>
        <Typography variant={'h6'}>{'Subject Icon'}</Typography>
      </Grid>
      <Grid item xs={12} container>
        {subjectIcons.map((icon: SubjectIcon, index) => {
          return (
            <Grid
              item
              xs={2}
              key={index}
              style={{
                textAlign: 'center',
              }}
              onMouseLeave={handleHover('')}
              onMouseEnter={handleHover(icon.id)}
            >
              {isHovering === icon.id ? (
                <Paper
                  elevation={3}
                  style={{
                    width: '100%',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    props.selectIconHandler(icon.icon);
                  }}
                >
                  <Grid container alignItems={'center'} justify={'center'}>
                    <Grid item>{React.createElement(icon.icon)}</Grid>
                  </Grid>
                </Paper>
              ) : props.selectedIcon === icon.icon ? (
                <Paper elevation={3}>{React.createElement(icon.icon)}</Paper>
              ) : (
                React.createElement(icon.icon)
              )}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export interface IconSelectorProps {
  selectedIcon: OverridableComponent<SvgIconTypeMap>;
  selectIconHandler: (icon: OverridableComponent<SvgIconTypeMap>) => void;
}

const mapStateToProps = (state: State): IconSelectorProps => {
  return ({
    selectedIcon: state.subjectListState.selectedIcon,
  } as unknown) as IconSelectorProps;
};

const mapDispatchToProps = (dispatch: Dispatch): IconSelectorProps =>
  (({
    selectIconHandler: (icon: OverridableComponent<SvgIconTypeMap>) => {
      dispatch(selectIcon(icon));
    },
  } as unknown) as IconSelectorProps);

export default connect(mapStateToProps, mapDispatchToProps)(IconSelector);
