import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Subject } from '../../../../configs/types/WeeklyPlanner';
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { subjectList } from '../../../../configs/dummy-data';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class SubjectList extends Component<SubjectListProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <List
        component={'nav'}
        aria-labelledby={'nested-list-subheader'}
        style={{ width: '100%', marginBottom: 32 }}
      >
        {subjectList.map((subject: Subject, index: number) => {
          return (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText primary={subject.name} />
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
  }
}

export type SubjectListProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(SubjectList);
