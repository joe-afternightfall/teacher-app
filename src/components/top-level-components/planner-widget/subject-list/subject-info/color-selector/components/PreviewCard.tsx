import React from 'react';
import { Card, Grid, Avatar, CardHeader, CardContent } from '@material-ui/core';
import { connect } from 'react-redux';
import { State } from '../../../../../../../configs/redux/store';
import { ColorChoice } from '../../../../../../../configs/theme/subject-color-choices';
import { getIcon } from '../../../../../../../utils/get-icon';

const PreviewCard = (props: PreviewCardProps) => {
  const icon = getIcon(props.selectedIconId);

  return (
    <Grid item xs={7}>
      <Card style={{ width: '75%', height: 200, margin: 'auto' }}>
        <CardHeader
          title={`Sample ${props.subjectName} Card`}
          style={{
            backgroundColor: props.selectedColor.primaryColor,
            color: props.selectedColor.secondaryColor,
          }}
          avatar={
            <Avatar aria-label={'subject-icon'}>
              {icon !== undefined ? (
                <Avatar>{React.createElement(icon)}</Avatar>
              ) : (
                <React.Fragment />
              )}
            </Avatar>
          }
        />
        <CardContent>{'Sample Card Content'}</CardContent>
      </Card>
    </Grid>
  );
};

export interface PreviewCardProps {
  subjectName: string;
  selectedColor: ColorChoice;
  selectedIconId: string;
}

const mapStateToProps = (state: State): PreviewCardProps => {
  return ({
    subjectName: state.subjectListState.subjectName,
    selectedColor: state.subjectListState.selectedColor,
    selectedIconId: state.subjectListState.selectedIconId,
  } as unknown) as PreviewCardProps;
};

export default connect(mapStateToProps)(PreviewCard);
