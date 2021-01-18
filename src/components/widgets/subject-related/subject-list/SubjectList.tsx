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
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Subject } from '../../../../configs/types/Subject';
import { getIcon } from '../../../../utils/get-icon';
import { State } from '../../../../configs/redux/store';
import { deleteSubject } from '../../../../services/subject-list-service';
import { openSubjectInfoDialog } from '../../../../creators/subject-list/subject-info-dialog';
import { editingSubject } from '../../../../creators/subject-list/editing-subject';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const SubjectList = (props: SubjectListProps) => {
  const classes = useStyles();

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
                    <Avatar style={{ backgroundColor: subject.primaryColor }}>
                      {React.createElement(icon)}
                    </Avatar>
                  ) : (
                    <React.Fragment />
                  )}
                </ListItemAvatar>
                <ListItemText primary={subject.subjectName} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge={'end'}
                    aria-label={'edit'}
                    onClick={() => {
                      props.editClickHandler(subject.id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <DeleteSubjectDialog
                    subjectName={subject.subjectName}
                    firebaseId={subject.firebaseId}
                    deleteClickHandler={props.deleteClickHandler}
                  />
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
  editClickHandler: (id: string) => void;
}

const mapStateToProps = (state: State): SubjectListProps => {
  const subjects = state.subjectListState.subjectList
    ? state.subjectListState.subjectList
    : [];

  const isEmpty = subjects.length === 0;

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
    editClickHandler: (id: string) => {
      dispatch(editingSubject(id));
      dispatch(openSubjectInfoDialog());
    },
  } as unknown) as DeleteSubjectDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList);
