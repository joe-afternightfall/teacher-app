import React, { Component, RefObject } from 'react';
import { Styles } from '@material-ui/styles';
import {
  StyledComponentProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { Button, IconButton, TextField } from '@material-ui/core';
import {
  Create,
  CalendarToday,
  Close,
  Notes,
  LocationOn,
} from '@material-ui/icons';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  textField: {
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  closeButton: {
    float: 'right',
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
});

class EditingForm extends Component<EditingFormProps> {
  render(): JSX.Element {
    const {
      classes,
      isNewAppointment,
      visible,
      target,
      displayAppointmentData,
      cancelChanges,
      onHide,
      visibleChange,
      applyChanges,
      changeAppointment,
      commitAppointment,
    } = this.props;

    const pickerEditorProps = (field: any) => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: (date: any) =>
        changeAppointment(
          field,
          date ? date.toDate() : new Date(displayAppointmentData[field])
        ),
      format: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });

    const textEditorProps = (field: any) => ({
      // variant: 'outlined',
      onChange: (target: any) => changeAppointment(field, target.value),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}
      >
        <div>
          <div className={classes.header}>
            <IconButton className={classes.closeButton} onClick={cancelChanges}>
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField variant={'outlined'} {...textEditorProps('title')} />
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  label="Start Date"
                  inputVariant={'outlined'}
                  {...pickerEditorProps('startDate')}
                />
                <KeyboardDateTimePicker
                  label="End Date"
                  inputVariant={'outlined'}
                  {...pickerEditorProps('endDate')}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color="action" />
              <TextField
                variant={'outlined'}
                {...textEditorProps('location')}
              />
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField
                multiline
                rows="6"
                variant={'outlined'}
                {...textEditorProps('notes')}
              />
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  commitAppointment('deleted');
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? 'Create' : 'Save'}
            </Button>
          </div>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}

export interface EditingFormProps extends WithStyles<typeof styles> {
  isNewAppointment: boolean;
  visible: boolean;
  target: RefObject<unknown>;
  displayAppointmentData: string;
  onHide: () => void;
  cancelChanges: ((event: any) => void) | undefined;
  visibleChange: () => void;
  applyChanges: () => void;
  commitAppointment: (type: string) => void;
  changeAppointment: (type: string, value: string) => void;
}

export default withStyles(styles, { withTheme: true })(EditingForm);
