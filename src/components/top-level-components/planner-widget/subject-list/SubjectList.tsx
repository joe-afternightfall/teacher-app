import React from 'react';
import {
  List,
  Avatar,
  Divider,
  ListItem,
  IconButton,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { State } from '../../../../configs/redux/store';
import { Subject } from '../../../../configs/types/Subject';
import { getIcon } from '../../../../utils/get-icon';

const SubjectList = (props: SubjectListProps) => {
  return (
    <List
      component={'nav'}
      aria-labelledby={'nested-list-subheader'}
      style={{ width: '100%', marginBottom: 32 }}
    >
      {props.subjectList.map((subject: Subject, index: number) => {
        const icon = getIcon(subject.iconId);
        return (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemAvatar>
                {icon !== undefined ? (
                  <Avatar>{React.createElement(icon)}</Avatar>
                ) : (
                  <React.Fragment />
                )}
              </ListItemAvatar>
              <ListItemText primary={subject.subjectName} />
              <ListItemSecondaryAction>
                <IconButton edge={'end'} aria-label={'delete'}>
                  <DeleteIcon />
                </IconButton>

                <IconButton
                  edge={'end'}
                  aria-label={'edit'}
                  style={{ marginLeft: 12 }}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant={'inset'} component={'li'} />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export interface SubjectListProps {
  subjectList: Subject[];
}

const mapStateToProps = (state: State): SubjectListProps => {
  return ({
    subjectList: state.subjectListState.subjectList,
  } as unknown) as SubjectListProps;
};

export default connect(mapStateToProps)(SubjectList);
