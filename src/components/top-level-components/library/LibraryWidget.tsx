import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const LibraryWidget = (props: LibraryWidgetProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <p>functional comp</p>
    </div>
  );
};

export interface LibraryWidgetProps {
  tempValue?: undefined;
}

const mapStateToProps = (state: any): LibraryWidgetProps => {
  return ({} as unknown) as LibraryWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LibraryWidgetProps =>
  (({} as unknown) as LibraryWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(LibraryWidget);
