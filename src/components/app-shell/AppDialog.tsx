import {
  Dialog,
  Button,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#fff',
  },
});

class AppDialog extends Component<AppDialogProps> {
  render(): JSX.Element {
    const { classes, maxWidth, open, titleColor, content } = this.props;

    return (
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={this.props.handleClose}
        open={open}
      >
        <DialogTitle
          style={{ background: titleColor }}
          id={'form-dialog-title'}
        >
          <IconButton
            aria-label={'close'}
            className={classes.closeButton}
            onClick={this.props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>{content}</DialogContent>

        <DialogActions>
          <Button onClick={this.props.handleClose} color={'secondary'}>
            {'Cancel'}
          </Button>
          <Button onClick={this.props.handleClose} color={'primary'}>
            {'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export interface AppDialogProps extends WithStyles<typeof styles> {
  open: boolean;
  titleColor: string;
  content: JSX.Element;
  handleClose: () => void;
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export default withStyles(styles, { withTheme: true })(AppDialog);
