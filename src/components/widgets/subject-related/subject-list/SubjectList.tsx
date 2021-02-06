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
import DeleteSubjectDialog, {
  DeleteSubjectDialogProps,
} from './DeleteSubjectDialog';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import { getIcon } from '../../../../utils/get-icon';
import { State } from '../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { editingSubject } from '../../../../creators/subject-list/editing-subject';
import { openSubjectInfoDialog } from '../../../../creators/subject-list/subject-info-dialog';
import { Subject } from '../../../../configs/models/Subject';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: theme.spacing(4),
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
      className={classes.root}
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
    editClickHandler: (id: string) => {
      dispatch(editingSubject(id));
      dispatch(openSubjectInfoDialog());
    },
  } as unknown) as DeleteSubjectDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList);
