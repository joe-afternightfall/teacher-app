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
    const { classes, title, maxWidth, open, titleColor, content } = this.props;

    const handleConfirmClick = () => {
      this.props.confirmClickHandler();
      this.props.handleClose();
    };

    return (
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={maxWidth}
        onClose={this.props.handleClose}
      >
        <DialogTitle
          style={{ background: titleColor, minHeight: 56, color: '#fff' }}
          id={'form-dialog-title'}
        >
          {title}
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
          <Button onClick={handleConfirmClick} color={'primary'}>
            {this.props.confirmButtonTitle}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export interface AppDialogProps extends WithStyles<typeof styles> {
  open: boolean;
  titleColor: string;
  title: string | JSX.Element;
  content: JSX.Element;
  handleClose: () => void;
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  confirmClickHandler: any;
  confirmButtonTitle: string;
}

export default withStyles(styles, { withTheme: true })(AppDialog);
