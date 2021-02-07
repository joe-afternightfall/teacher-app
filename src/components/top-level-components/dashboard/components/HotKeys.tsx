import React from 'react';
import { Card, Grid, CardContent, CardActionArea } from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../configs/redux/store';
import { AppTheme } from '../../../../configs/theme/light-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    templateBuilder: {
      color: theme.palette.primary.contrastText,
      background: theme.palette.colors.accents.green,
    },
    bookmarks: {
      color: theme.palette.primary.contrastText,
      background: theme.palette.colors.accents.purple,
    },
    blank: {
      color: theme.palette.primary.contrastText,
      background: theme.palette.colors.accents.blue,
    },
  })
);

const HotKeys = (props: HotKeysProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card>
          <CardActionArea className={classes.templateBuilder}>
            <CardContent>{'Template Builder'}</CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardActionArea className={classes.bookmarks}>
            <CardContent>{'Bookmarks'}</CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardActionArea className={classes.blank}>
            <CardContent>{'Empty'}</CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export interface HotKeysProps {
  numberOfSubjects: number;
}

const mapStateToProps = (state: State): HotKeysProps => {
  return ({
    numberOfSubjects: state.subjectListState.subjectList.length,
  } as unknown) as HotKeysProps;
};

const mapDispatchToProps = (dispatch: Dispatch): HotKeysProps =>
  (({} as unknown) as HotKeysProps);

export default connect(mapStateToProps, mapDispatchToProps)(HotKeys);
