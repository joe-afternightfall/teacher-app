import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid, Paper, Tooltip, Typography } from '@material-ui/core';
import {
  SubjectIcon,
  subjectIcons,
} from '../../../../../configs/theme/subject-icon-choices';
import { State } from '../../../../../configs/redux/store';
import { selectIcon } from '../../../../../creators/subject-list/select-icon';

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
          const found = props.iconIds.some((id) => {
            return id === icon.id;
          });

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
                  onClick={() =>
                    found ? undefined : props.selectIconHandler(icon.id)
                  }
                >
                  {found ? (
                    <Tooltip title={'Taken'} placement={'top'}>
                      <Grid container alignItems={'center'} justify={'center'}>
                        <Grid item>{React.createElement(icon.icon)}</Grid>
                      </Grid>
                    </Tooltip>
                  ) : (
                    <Grid container alignItems={'center'} justify={'center'}>
                      <Grid item>{React.createElement(icon.icon)}</Grid>
                    </Grid>
                  )}
                </Paper>
              ) : props.selectedIconId === icon.id ? (
                <Paper elevation={3}>{React.createElement(icon.icon)}</Paper>
              ) : found ? (
                <Paper style={{ opacity: 0.5 }} elevation={3}>
                  {React.createElement(icon.icon)}
                </Paper>
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
  iconIds: string[];
  selectedIconId: string;
  selectIconHandler: (iconId: string) => void;
}

const mapStateToProps = (state: State): IconSelectorProps => {
  const iconIds = state.subjectListState.subjectList.map((subject) => {
    return subject.iconId;
  });

  return ({
    iconIds: iconIds,
    selectedIconId: state.subjectListState.selectedIconId,
  } as unknown) as IconSelectorProps;
};

const mapDispatchToProps = (dispatch: Dispatch): IconSelectorProps =>
  (({
    selectIconHandler: (iconId: string) => {
      dispatch(selectIcon(iconId));
    },
  } as unknown) as IconSelectorProps);

export default connect(mapStateToProps, mapDispatchToProps)(IconSelector);
