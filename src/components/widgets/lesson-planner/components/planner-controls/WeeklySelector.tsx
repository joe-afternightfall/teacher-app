import clsx from 'clsx';
import {
  isValid,
  format,
  isSameDay,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from 'date-fns';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: 'inherit',
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
});

class WeeklySelector extends Component<WeeklySelectorProps> {
  state = {
    selectedDate: new Date(),
  };

  handleWeekChange = (date: any) => {
    this.setState({
      selectedDate: startOfWeek(date),
    });
    this.props.updateHandler(date);
  };

  formatWeekSelectLabel = (
    date: MaterialUiPickersDate,
    invalidLabel: string
  ) => {
    return date && isValid(date)
      ? `Week of ${format(startOfWeek(date), 'MMM do')}`
      : invalidLabel;
  };

  renderWrappedWeekDay = (
    date: any,
    selectedDate: any,
    dayInCurrentMonth: any
  ) => {
    const { classes } = this.props;
    const dateClone = date;
    const selectedDateClone = selectedDate;

    const start = startOfWeek(selectedDateClone);
    const end = endOfWeek(selectedDateClone);

    const dayIsBetween = isWithinInterval(dateClone, { start, end });
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(dateClone, 'd')} </span>
        </IconButton>
      </div>
    );
  };

  render(): JSX.Element {
    const { selectedDate } = this.state;

    return (
      <KeyboardDatePicker
        disableToolbar
        variant={'inline'}
        label={'Week of'}
        value={selectedDate}
        onChange={this.handleWeekChange}
        renderDay={this.renderWrappedWeekDay}
        labelFunc={this.formatWeekSelectLabel}
      />
    );
  }
}

export interface WeeklySelectorProps extends WithStyles<typeof styles> {
  updateHandler: (date: string) => void;
}

export default withStyles(styles, { withTheme: true })(WeeklySelector);
