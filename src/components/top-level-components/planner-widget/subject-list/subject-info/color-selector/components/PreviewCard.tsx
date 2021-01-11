import React from 'react';
import {
  Card,
  Grid,
  Avatar,
  CardHeader,
  CardContent,
  SvgIconTypeMap,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { State } from '../../../../../../../configs/redux/store';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { ColorChoice } from '../../../../../../../configs/theme/subject-color-choices';

const PreviewCard = (props: PreviewCardProps) => {
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
              {React.createElement(props.selectedIcon)}
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
  selectedIcon: OverridableComponent<SvgIconTypeMap>;
}

const mapStateToProps = (state: State): PreviewCardProps => {
  return ({
    subjectName: state.subjectListState.subjectName,
    selectedColor: state.subjectListState.selectedColor,
    selectedIcon: state.subjectListState.selectedIcon,
  } as unknown) as PreviewCardProps;
};

export default connect(mapStateToProps)(PreviewCard);
