import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import IconSelector from './IconSelector';
import {
  renderWithRedux,
  getSubjectListStore,
} from '../../../../configs/test-utils/mock-redux';
import { Subject } from '../../../../configs/models/Subject';
import { fireEvent, waitFor } from '@testing-library/react';

describe('Icon Selector Component', () => {
  it('should dispatch select icon', () => {
    const store = getSubjectListStore({
      selectedIconId: '',
      subjectList: [subject()],
    });
    const iconSelector = renderWithRedux(<IconSelector />, store);

    expect(iconSelector.getByTestId('found-Book')).toBeInTheDocument();
    iconSelector
      .getByTestId('icon-f4918888-bd77-4224-aeef-e1362a5def31')
      .click();

    expect(store.getActions()).toEqual([
      { iconId: 'f4918888-bd77-4224-aeef-e1362a5def31', type: 'SELECT_ICON' },
    ]);
  });

  it('should trigger hover with tooltip', async () => {
    const store = getSubjectListStore({
      selectedIconId: '',
      subjectList: [subject()],
    });

    const iconSelector = renderWithRedux(<IconSelector />, store);

    const iconId = '0fef5acb-6d2e-4bbc-9b5e-ea0a468ec35f';
    const iconShell = iconSelector.getByTestId(`icon-${iconId}`);

    fireEvent.mouseOver(iconShell);

    await waitFor(() => {
      iconSelector.getByTestId(`hovering-${iconId}`);
      expect(iconSelector.getByTestId('taken-tooltip')).toBeInTheDocument();
      expect(iconSelector.getByTitle('Taken')).toBeInTheDocument();
      iconShell.click();
    });

    expect(store.getActions()).toEqual([]);
  });

  it('should trigger hover with no tooltip', async () => {
    const store = getSubjectListStore({
      selectedIconId: '',
      subjectList: [subject()],
    });

    const iconSelector = renderWithRedux(<IconSelector />, store);

    const iconId = 'a7e1d8f6-5b51-4d13-b248-ff4d588d32bd';
    fireEvent.mouseOver(iconSelector.getByTestId(`icon-${iconId}`));

    await waitFor(() => {
      iconSelector.getByTestId(`hovering-${iconId}`);
      expect(
        iconSelector.getByTestId(`no-tooltip-${iconId}`)
      ).toBeInTheDocument();
    });
  });
});

function subject(): Subject {
  return {
    firebaseId: uuidv4(),
    id: uuidv4(),
    subjectName: `Test Subject Name`,
    primaryColorId: 'd40724de-f81d-4f03-b199-85081d09d435',
    primaryColor: uuidv4(),
    secondaryColor: uuidv4(),
    iconId: '0fef5acb-6d2e-4bbc-9b5e-ea0a468ec35f',
  };
}
