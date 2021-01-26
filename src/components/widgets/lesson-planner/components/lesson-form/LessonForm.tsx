import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@material-ui/core';
import SubjectDropdown from '../../../subject-related/subject-dropdown/SubjectDropdown';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';
import NewLinkCard from '../dialog/NewLinkCard';
import ImageIcon from '@material-ui/icons/Image';
import WeekdaySelectionGroup from './components/WeekdaySelectionGroup';
import { State } from '../../../../../configs/redux/store';
import TimeInput from './components/TimeInput';
import {
  updateLessonContent,
  updateLessonSubject,
} from '../../../../../creators/lesson-planner/update-items';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    linkUrl: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  })
);

const LessonForm = (props: LessonFormProps): JSX.Element => {
  const classes = useStyles();

  // todo:  extract out to util
  const cleanupLink = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    } else {
      return `https://${url}`;
    }
  };

  // const addNewLinkClickHandler = () => {
  //   this.setState({
  //     addNewLink: true,
  //   });
  // };

  // const closeNewLinkClickHandler = () => {
  //   this.setState({
  //     addNewLink: false,
  //   });
  // };

  // const saveLinkClickHandler = (link: CustomLink) => {
  //   this.setState(
  //     {
  //       addNewLink: false,
  //       links: [...this.state.links, link],
  //     },
  //     clearNewLink
  //   );
  // };

  // const clearNewLink = () => {
  //   this.setState({
  //     newLink: {
  //       linkUrl: '',
  //       linkTitle: '',
  //     },
  //   });
  // };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Grid item>
          <SubjectDropdown
            value={props.lessonSubjectId}
            changeHandler={props.dropdownChangeHandler}
          />
        </Grid>

        <Grid item style={{ marginTop: 40 }}>
          <TextField
            style={{ width: '100%' }}
            id={'filled-multiline-content'}
            label={'Content'}
            multiline
            rowsMax={8}
            rows={6}
            value={props.content}
            onChange={props.contentChangeHandler}
            variant={'outlined'}
            inputProps={{
              name: 'content',
            }}
          />
        </Grid>

        {/*<Card>*/}
        {/*  <CardHeader*/}
        {/*    title={*/}
        {/*      this.state.addNewLink ? 'Add New Link' : 'Subject Links'*/}
        {/*    }*/}
        {/*    action={*/}
        {/*      <IconButton*/}
        {/*        color={this.state.addNewLink ? 'inherit' : 'primary'}*/}
        {/*        onClick={*/}
        {/*          this.state.addNewLink*/}
        {/*            ? closeNewLinkClickHandler*/}
        {/*            : addNewLinkClickHandler*/}
        {/*        }*/}
        {/*      >*/}
        {/*        {this.state.addNewLink ? <CancelIcon /> : <AddIcon />}*/}
        {/*      </IconButton>*/}
        {/*    }*/}
        {/*  />*/}
        {/*<CardContent>*/}
        {/*  {this.state.addNewLink ? (*/}
        {/*    <NewLinkCard clickHandler={saveLinkClickHandler} />*/}
        {/*  ) : (*/}
        {/*    <List>*/}
        {/*      {this.state.links.map(*/}
        {/*        (link: CustomLink, index: number) => {*/}
        {/*          return (*/}
        {/*            <ListItem key={index}>*/}
        {/*              <ListItemAvatar>*/}
        {/*                <Avatar>*/}
        {/*                  <ImageIcon />*/}
        {/*                </Avatar>*/}
        {/*              </ListItemAvatar>*/}
        {/*              <ListItemText*/}
        {/*                primary={*/}
        {/*                  <Link*/}
        {/*                    href={cleanupLink(link.linkUrl)}*/}
        {/*                    rel={'noopener noreferrer'}*/}
        {/*                    className={classes.linkUrl}*/}
        {/*                    target={'_blank'}*/}
        {/*                  >*/}
        {/*                    {link.linkTitle}*/}
        {/*                  </Link>*/}
        {/*                }*/}
        {/*              />*/}
        {/*            </ListItem>*/}
        {/*          );*/}
        {/*        }*/}
        {/*      )}*/}
        {/*    </List>*/}
        {/*  )}*/}
        {/*</CardContent>*/}

        {/*{this.state.links.map((link: CustomLink) => {*/}
        {/*  {*/}
        {/*    link.linkTitle;*/}
        {/*  }*/}
        {/*})}*/}
        {/*</Card>*/}
      </Grid>

      <Grid item xs={6}>
        <Grid item>
          <WeekdaySelectionGroup />
        </Grid>

        <Grid item>
          <TimeInput />
        </Grid>
      </Grid>
    </Grid>
  );
};

export interface LessonFormProps {
  content: string;
  lessonSubjectId: string;
  dropdownChangeHandler: (
    e: React.ChangeEvent<{ name?: string; value: string }>
  ) => void;
  contentChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const mapStateToProps = (state: State): LessonFormProps => {
  return ({
    lessonSubjectId: state.lessonPlannerState.lessonSubjectId,
    content: state.lessonPlannerState.lessonContent,
  } as unknown) as LessonFormProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LessonFormProps =>
  (({
    dropdownChangeHandler: (
      e: React.ChangeEvent<{ name?: string; value: string }>
    ) => {
      dispatch(updateLessonSubject(e.target.value));
    },
    contentChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateLessonContent(e.target.value));
    },
  } as unknown) as LessonFormProps);

export default connect(mapStateToProps, mapDispatchToProps)(LessonForm);
