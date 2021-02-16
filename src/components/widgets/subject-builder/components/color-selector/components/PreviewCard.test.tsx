import React from 'react';
import PreviewCard from './PreviewCard';
import {
  getStore,
  renderWithRedux,
} from '../../../../../../configs/test-utils/mock-redux';

describe('Preview Card Component', () => {
  it('should render with data when icon found', () => {
    const store = getStore({
      subjectListState: {
        selectedIconId: 'asdf',
      },
    });
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
});
