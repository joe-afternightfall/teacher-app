import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ColorSelectionGrid from './ColorSelectionGrid';
import {
  buildColor,
  buildSubjectList,
} from '../../../../../../configs/test-utils/test-util';
import {
  renderWithRedux,
  getSubjectListStore,
} from '../../../../../../configs/test-utils/mock-redux';
import { Subject } from '../../../../../../configs/models/Subject';

describe('Color Selection Grid Component', () => {
  it('should render with data', () => {
    const store = getSubjectListStore({
      subjectList: buildSubjectList(3),
      selectedColor: buildColor(1)[0],
    });
    const colorSelectionGrid = renderWithRedux(<ColorSelectionGrid />, store);

    colorSelectionGrid.getByTestId('Red').click();

    expect(store.getActions()).toEqual([
      {
        selectedColor: {
          id: 'f00c79b6-e08f-44dc-8d6a-0dc695e92c05',
          name: 'Red',
          primaryColor: '#f44336',
          secondaryColor: '#fff',
        },
        type: 'SELECT_COLOR',
      },
    ]);
  });

  it('should not allow click', () => {
    const store = getSubjectListStore({
      subjectList: [subject()],
      selectedColor: buildColor(1)[0],
    });
    const colorSelectionGrid = renderWithRedux(<ColorSelectionGrid />, store);

    colorSelectionGrid.getByTestId('Pink').click();

    expect(store.getActions()).toEqual([]);
  });

  it('should render with white check', () => {
    const store = getSubjectListStore({
      subjectList: [subject()],
      selectedColor: color(),
    });
    const colorSelectionGrid = renderWithRedux(<ColorSelectionGrid />, store);

    colorSelectionGrid.getByTestId('Indigo').click();

    expect(
      colorSelectionGrid.getByTestId('color-box-#fff')
    ).toBeInTheDocument();
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
    iconId: uuidv4(),
  };
}

function color() {
  return {
    id: uuidv4(),
    name: 'Indigo',
    primaryColor: uuidv4(),
    secondaryColor: uuidv4(),
  };
}
