import React from 'react';
import {
  renderWithRedux,
  getTemplateBuilderStore,
} from '../../../../../configs/test-utils/mock-redux';
import WeekdaySelectionGroup from './WeekdaySelectionGroup';

describe('Weekday Selection Group Component', () => {
  it('should dispatch all days selected', () => {
    const store = getTemplateBuilderStore({});

    const selectionGroup = renderWithRedux(<WeekdaySelectionGroup />, store);

    expect(selectionGroup.getByText('Days of the week')).toBeInTheDocument();
    selectionGroup.getByTestId('everyday-checkbox').click();

    expect(store.getActions()).toStrictEqual([
      { checked: true, type: 'UPDATE_ALL_SELECTED_DAYS' },
    ]);
  });

  it('should dispatch selected days', () => {
    const store = getTemplateBuilderStore({});

    const selectionGroup = renderWithRedux(<WeekdaySelectionGroup />, store);

    expect(selectionGroup.getByText('Days of the week')).toBeInTheDocument();
    selectionGroup.getByText('Mon').click();

    expect(store.getActions()).toStrictEqual([
      { selectedDay: 'monday', type: 'UPDATE_SELECTED_DAYS' },
    ]);
  });

  it('should render with all days selected', () => {
    const store = getTemplateBuilderStore({
      allDaysSelected: true,
    });

    const selectionGroup = renderWithRedux(<WeekdaySelectionGroup />, store);

    selectionGroup.getByText('Mon').click();

    expect(store.getActions()).toStrictEqual([
      { selectedDay: 'monday', type: 'UPDATE_SELECTED_DAYS' },
    ]);
  });
});
