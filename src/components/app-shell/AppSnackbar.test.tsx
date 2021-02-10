import React from 'react';
import AppSnackbar from './AppSnackbar';
import { getStore, renderWithRedux } from '../../configs/test-utils/mock-redux';

describe('AppSnackbar Component', () => {
  it('should dispatch hide app snackbar', () => {
    const store = getStore(
      {
        displayAppSnackbar: true,
        snackbarProps: {
          text: 'testing-title',
          severity: 'success',
          position: {
            vertical: 'top',
            horizontal: 'left',
          },
        },
      },
      null
    );

    const snackbar = renderWithRedux(<AppSnackbar />, store);
    const closeButton = snackbar.container.querySelector('button');

    expect(snackbar.getByText('testing-title')).toBeInTheDocument();
    closeButton && closeButton.click();
    expect(store.getActions()).toEqual([
      {
        type: 'HIDE_APP_SNACKBAR',
      },
    ]);
  });
});
