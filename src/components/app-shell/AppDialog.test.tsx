import React from 'react';
import AppDialog from './AppDialog';
import { Typography } from '@material-ui/core';
import { waitFor } from '@testing-library/react';
import { getStore, renderWithRedux } from '../../configs/test-utils/mock-redux';

describe('App Dialog Component', () => {
  const content = <Typography>{'testing content'}</Typography>;
  const confirmClickHandler = jest.fn();
  const dialogState = {
    displayAppDialog: true,
    dialogContent: content,
    dialogWidth: 'sm',
    dialogTitle: 'Testing Title',
    dialogTitleColor: '#777',
    confirmButtonTitle: 'Confirm Button Title',
    confirmClickHandler: confirmClickHandler,
  };

  it('should call confirm handler and then close dialog', () => {
    const store = getStore(dialogState);

    const appDialog = renderWithRedux(<AppDialog />, store);

    appDialog.getByTestId('app-dialog-confirm-button').click();

    expect(confirmClickHandler).toBeCalledTimes(1);
    expect(appDialog.getByText('Testing Title')).toBeInTheDocument();
    expect(appDialog.getByText('testing content')).toBeInTheDocument();
    expect(appDialog.getByText('Confirm Button Title')).toBeInTheDocument();
    expect(store.getActions()).toEqual([{ type: 'CLOSE_APP_DIALOG' }]);
  });

  it('should dispatch close app dialog action', async () => {
    const store = getStore(dialogState);

    const appDialog = renderWithRedux(<AppDialog />, store);

    appDialog.getByTestId('app-dialog-close-button').click();

    expect(confirmClickHandler).toBeCalledTimes(0);
    expect(appDialog.getByText('Testing Title')).toBeInTheDocument();
    expect(appDialog.getByText('testing content')).toBeInTheDocument();
    expect(store.getActions()).toEqual([{ type: 'CLOSE_APP_DIALOG' }]);

    await waitFor(() =>
      expect(store.getActions()).toEqual([
        { type: 'CLOSE_APP_DIALOG' },
        { type: 'CLEAR_APP_DIALOG' },
      ])
    );
  });
});
