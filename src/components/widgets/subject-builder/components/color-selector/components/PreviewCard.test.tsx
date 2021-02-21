import React from 'react';
import PreviewCard from './PreviewCard';
import {
  getStore,
  renderWithRedux,
  getSubjectListStore,
} from '../../../../../../configs/test-utils/mock-redux';

describe('Preview Card Component', () => {
  it('should render with data when icon found', () => {
    const store = getStore({});
    const previewCard = renderWithRedux(<PreviewCard />, store);

    const selectedIconId = store.getState().subjectListState.selectedIconId;
    expect(
      previewCard.getByText('Sample Test Subject Name Card')
    ).toBeInTheDocument();

    expect(
      previewCard.getByTestId(`${selectedIconId}-icon`)
    ).toBeInTheDocument();
    expect(previewCard.getByText('Sample Card Content')).toBeInTheDocument();
  });

  it('should render without avatar icon', () => {
    const store = getSubjectListStore({
      subjectName: '',
      selectedIconId: '',
      selectedColor: [],
    });

    const previewCard = renderWithRedux(<PreviewCard />, store);

    expect(previewCard.getByTestId(`empty-avatar`)).toBeInTheDocument();
    expect(previewCard.getByText('Sample Card Content')).toBeInTheDocument();
  });
});
