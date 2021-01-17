import {
  Link,
  Grid,
  Dialog,
  Button,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardHeader,
  CardContent,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Styles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  Lesson,
  LessonItem,
} from '../../../../../configs/types/LessonPlanner';
import WeekdaySelectionGroup from './WeekdaySelectionGroup';
import NewLinkCard from './NewLinkCard';
import ImageIcon from '@material-ui/icons/Image';
import CancelIcon from '@material-ui/icons/Cancel';
import { NewLinkForm } from '../../../topic-links/components/NewLinkDialog';
import SubjectDropdown from '../../../subject-dropdown/SubjectDropdownConnector';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  linkUrl: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export interface CustomLink {
  linkUrl: string;
  linkTitle: string;
}

interface LessonDialogState {
  [key: string]: string | boolean | string[] | CustomLink[] | CustomLink;
  open: boolean;
  title: string;
  content: string;
  links: CustomLink[];
  addNewLink: boolean;
  selectedDays: string[];
  newLink: CustomLink;
}

class LessonDialog extends Component<LessonDialogProps, LessonDialogState> {
  state = {
    open: false,
    content: '',
    title: '',
    selectedDays: [''],
    links: [
      {
        linkUrl: '',
        linkTitle: '',
      },
    ],
    newLink: {
      linkUrl: '',
      linkTitle: '',
    },
    addNewLink: false,
    subjectId: '',
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const handleClickOpen = () => {
      this.setState({
        open: true,
      });
    };

    const handleClose = () => {
      this.setState({
        open: false,
      });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    // todo:  extract out to util
    const cleanupLink = (url: string): string => {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      } else {
        return `https://${url}`;
      }
    };

    const handleDayChange = (e: React.MouseEvent<HTMLElement>) => {
      const element = e.currentTarget as HTMLInputElement;
      const value = element.value;

      if (this.state.selectedDays.indexOf(value) === -1) {
        this.setState({
          selectedDays: [...this.state.selectedDays, value],
        });
      } else {
        this.setState({
          selectedDays: this.state.selectedDays.filter((day) => {
            return day !== value;
          }),
        });
      }
    };

    const dropdownChangeHandler = (
      e: React.ChangeEvent<{ name?: string; value: string }>
    ) => {
      this.setState({
        subjectId: e.target.value,
      });
    };

    const addNewLinkClickHandler = () => {
      this.setState({
        addNewLink: true,
      });
    };

    const closeNewLinkClickHandler = () => {
      this.setState({
        addNewLink: false,
      });
    };

    const saveLinkClickHandler = (link: CustomLink) => {
      this.setState(
        {
          addNewLink: false,
          links: [...this.state.links, link],
        },
        clearNewLink
      );
    };

    const clearNewLink = () => {
      this.setState({
        newLink: {
          linkUrl: '',
          linkTitle: '',
        },
      });
    };

    return (
      <div>
        <Button
          color={'primary'}
          variant={'contained'}
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          {'Add New'}
        </Button>

        <Dialog
          maxWidth={'md'}
          fullWidth={true}
          onClose={handleClose}
          open={this.state.open}
        >
          <DialogTitle id="form-dialog-title">
            {'New Subject Item'}
            <IconButton
              aria-label={'close'}
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid item>
                  <SubjectDropdown
                    width={200}
                    value={this.state.subjectId}
                    changeHandler={dropdownChangeHandler}
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
                    value={this.state.content}
                    onChange={handleChange}
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
                {/*  <CardContent>*/}
                {/*    {this.state.addNewLink ? (*/}
                {/*      <NewLinkCard clickHandler={saveLinkClickHandler} />*/}
                {/*    ) : (*/}
                {/*      <List className={classes.root}>*/}
                {/*        {this.state.links.map(*/}
                {/*          (link: CustomLink, index: number) => {*/}
                {/*            return (*/}
                {/*              <ListItem key={index}>*/}
                {/*                <ListItemAvatar>*/}
                {/*                  <Avatar>*/}
                {/*                    <ImageIcon />*/}
                {/*                  </Avatar>*/}
                {/*                </ListItemAvatar>*/}
                {/*                <ListItemText*/}
                {/*                  primary={*/}
                {/*                    <Link*/}
                {/*                      href={cleanupLink(link.linkUrl)}*/}
                {/*                      rel={'noopener noreferrer'}*/}
                {/*                      className={classes.linkUrl}*/}
                {/*                      target={'_blank'}*/}
                {/*                    >*/}
                {/*                      {link.linkTitle}*/}
                {/*                    </Link>*/}
                {/*                  }*/}
                {/*                />*/}
                {/*              </ListItem>*/}
                {/*            );*/}
                {/*          }*/}
                {/*        )}*/}
                {/*      </List>*/}
                {/*    )}*/}
                {/*  </CardContent>*/}

                {/*  {this.state.links.map((link: CustomLink) => {*/}
                {/*    {*/}
                {/*      link.linkTitle;*/}
                {/*    }*/}
                {/*  })}*/}
                {/*</Card>*/}
              </Grid>

              <Grid item xs={6}>
                <Grid item>
                  <WeekdaySelectionGroup
                    selectedDays={this.state.selectedDays}
                    changeHandler={handleDayChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {'Cancel'}
            </Button>
            <Button onClick={handleClose} color={'primary'}>
              {'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export interface LessonDialogProps extends WithStyles<typeof styles> {
  reorderHandler: (items: LessonItem[], sourceId: string) => void;
  selectedPlanner: Lesson;
}

export default withStyles(styles, { withTheme: true })(LessonDialog);
