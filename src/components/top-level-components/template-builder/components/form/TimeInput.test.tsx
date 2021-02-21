import React from 'react';
import TimeInput from './TimeInput';
import userEvent from '@testing-library/user-event';
import {
  renderWithRedux,
  getTemplateBuilderStore,
} from '../../../../../configs/test-utils/mock-redux';

describe('Time Input Component', () => {
  it('should update start time', () => {
    const store = getTemplateBuilderStore({});
    const timeInput = renderWithRedux(<TimeInput />, store);

    const input = timeInput
      .getByTestId('start-time-picker')
      .querySelector('input');

    if (input !== null) {
      userEvent.clear(input);
      userEvent.type(input, '0130A');
    }

    expect(store.getActions().length).toEqual(6);
    expect(store.getActions()[0].type).toBe('UPDATE_START_AND_END_TIME');
    expect(store.getActions()[0].name).toBe('startTime');
  });

  it('should update end time', () => {
    const store = getTemplateBuilderStore({});
    const timeInput = renderWithRedux(<TimeInput />, store);

    const input = timeInput
      .getByTestId('end-time-picker')
      .querySelector('input');

    if (input !== null) {
      userEvent.clear(input);
      userEvent.type(input, '0230A');
    }

    expect(store.getActions().length).toEqual(6);
    expect(store.getActions()[0].type).toBe('UPDATE_START_AND_END_TIME');
    expect(store.getActions()[0].name).toBe('endTime');
  });
});
