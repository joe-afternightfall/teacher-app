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
  ListSubheader,
  Grid,
  Card,
  Tooltip,
} from '@material-ui/core';
import DeleteSubjectDialog, {
  DeleteSubjectDialogProps,
} from './DeleteSubjectDialog';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { getIcon } from '../../../../utils/get-icon';
import { State } from '../../../../configs/redux/store';
import {
  clearEditing,
  editingSubject,
} from '../../../../creators/subject-list/editing-subject';
import { Subject } from '../../../../configs/models/Subject';
import {
  clearSubjectBuilderDialog,
  openSubjectBuilderDialog,
} from '../../../../creators/subject-list/subject-builder-dialog';
import { AppTheme } from '../../../../configs/theme/light-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '50vh',
      marginBottom: theme.spacing(4),
    },
    title: {
      flexGrow: 1,
    },
    subheader: {
      color: theme.palette.primary.contrastText,
      background: theme.palette.colors.accents.pink,
    },
  })
);

const SubjectList = (props: SubjectListProps) => {
  const classes = useStyles();

  return (
    <Card>
      <List
        component={'nav'}
        aria-labelledby={'nested-list-subheader'}
        className={classes.root}
        subheader={
          <ListSubheader component={'div'} className={classes.subheader}>
            <Grid container justify={'space-between'} alignItems={'center'}>
              <Grid item>{'Subject List'}</Grid>

              <Grid item>
                <Tooltip title={'Add New'} placement={'top'}>
                  <IconButton
                    data-testid={'add-new-subject'}
                    onClick={props.newSubjectHandler}
                  >
                    <AddIcon style={{ color: '#fff' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </ListSubheader>
        }
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
                      data-testid={`edit-${subject.subjectName}`}
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
    </Card>
  );
};

export interface SubjectListProps {
  isEmpty: boolean;
  subjectList: Subject[];
  editClickHandler: (id: string) => void;
  newSubjectHandler: () => void;
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
      dispatch(openSubjectBuilderDialog());
    },
    newSubjectHandler: () => {
      dispatch(clearEditing());
      dispatch(clearSubjectBuilderDialog());
      dispatch(openSubjectBuilderDialog());
    },
  } as unknown) as DeleteSubjectDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList);
