/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import {
  ViewState,
  EditingState,
  ChangeSet,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {
  StyledComponentProps,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import {
  Fab,
  Button,
  Paper,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  IconButton,
  TextField,
} from '@material-ui/core';
import {
  Create,
  CalendarToday,
  Close,
  Notes,
  LocationOn,
  Add,
} from '@material-ui/icons';
import { appointments } from './appointments';
import { Styles } from '@material-ui/styles';
import EditingForm from './components/EditingForm';

const containerStyles: Styles<Theme, StyledComponentProps> = () => ({});

class AppointmentFormContainerBasic extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      appointmentChanges: {},
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  getAppointmentData = () => {
    const { appointmentData } = this.props;
    return appointmentData;
  };

  getAppointmentChanges = () => {
    const { appointmentChanges } = this.state;
    return appointmentChanges;
  };

  changeAppointment(field: any, changes: any) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type: any) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;

    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <EditingForm
        isNewAppointment={isNewAppointment}
        visible={visible}
        target={target}
        displayAppointmentData={displayAppointmentData}
        onHide={onHide}
        cancelChanges={cancelChanges}
        visibleChange={visibleChange}
        applyChanges={applyChanges}
        commitAppointment={this.commitAppointment}
        changeAppointment={this.changeAppointment}
      />
    );
  }
}

const AppointmentFormContainer = withStyles(containerStyles, {
  name: 'AppointmentFormContainer',
})(AppointmentFormContainerBasic);

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});

let appointmentForm: any;
/* eslint-disable-next-line react/no-multi-comp */
class Demo extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(
      this
    );

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(
      this
    );
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment =
        data.filter(
          (appointment: any) =>
            editingAppointment && appointment.id === editingAppointment.id
        )[0] || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  componentDidUpdate() {
    appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment: any) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment: any) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id: any) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state: any) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(
        (appointment: any) => appointment.id !== deletedAppointmentId
      );

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges(changes: ChangeSet): void {
    this.setState((state: any) => {
      let { data } = state;
      if (changes.added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...changes.added }];
      }
      if (changes.changed) {
        data = data.map((appointment: any) => {
          if (changes.changed !== undefined) {
            return changes.changed[appointment.id]
              ? { ...appointment, ...changes.changed[appointment.id] }
              : appointment;
          }
        });
      }
      if (changes.deleted !== undefined) {
        this.setDeletedAppointmentId(changes.deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;
    const { classes } = this.props;

    return (
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
          <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
          <MonthView />
          <EditRecurrenceMenu />
          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
          <Toolbar />
          <ViewSwitcher />
          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
          <DragDropProvider />
        </Scheduler>

        <Dialog open={confirmationVisible}>
          <DialogTitle>Delete Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.toggleConfirmationVisible}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={this.commitDeletedAppointment}
              color="secondary"
              variant="outlined"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Fab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <Add />
        </Fab>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Demo);
