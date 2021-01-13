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
import {
  DeleteSubjectDialog,
  DeleteSubjectDialogProps,
} from './DeleteSubjectDialog';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import EditIcon from '@material-ui/icons/Edit';
import { getIcon } from '../../../../../utils/get-icon';
import { State } from '../../../../../configs/redux/store';
import { Subject } from '../../../../../configs/types/Subject';
import { deleteSubject } from '../../../../../creators/subject-list';

const SubjectList = (props: SubjectListProps) => {
  return (
    <List
      component={'nav'}
      aria-labelledby={'nested-list-subheader'}
      style={{ width: '100%', marginBottom: 32 }}
    >
      {props.isEmpty ? (
        <ListItem style={{ textAlign: 'center' }}>
          <ListItemText primary={'subject list is empty'} />
        </ListItem>
      ) : (
        props.subjectList.map((subject: Subject, index: number) => {
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
                  <DeleteSubjectDialog
                    subjectName={subject.subjectName}
                    firebaseId={subject.firebaseId}
                    deleteClickHandler={props.deleteClickHandler}
                  />

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
        })
      )}
    </List>
  );
};

export interface SubjectListProps {
  isEmpty: boolean;
  subjectList: Subject[];
  deleteClickHandler: (id: string) => void;
}

const mapStateToProps = (state: State): SubjectListProps => {
  const subjects = state.subjectListState.subjectList
    ? state.subjectListState.subjectList
    : [];
  let isEmpty;

  // todo:  come back to isEmpty

  if (subjects.length === 0) {
    isEmpty = true;
  } else {
    isEmpty = false;
  }

  return ({
    isEmpty: isEmpty,
    subjectList: subjects,
  } as unknown) as SubjectListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): DeleteSubjectDialogProps =>
  (({
    deleteClickHandler: (id: string) => {
      console.log('DELETEING_ID = ' + id);
      (dispatch as ThunkDispatch<State, void, AnyAction>)(deleteSubject(id));
    },
  } as unknown) as DeleteSubjectDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList);
