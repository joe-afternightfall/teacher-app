import { clearAppDialog, closeAppDialog, displayAppDialog } from './app-dialog';
import React from 'react';

describe('app dialog action', () => {
  it('should return DISPLAY_APP_DIALOG action', () => {
    const confirmClickHandler = () => {};
    const action = displayAppDialog({
      maxWidth: 'sm',
      titleColor: 'test-color',
      content: React.createElement('p'),
      title: 'Test Title',
      confirmButtonTitle: 'Confirmation Title',
      confirmClickHandler: confirmClickHandler,
    });

    expect(action).toStrictEqual({
      type: 'DISPLAY_APP_DIALOG',
      maxWidth: 'sm',
      titleColor: 'test-color',
      content: React.createElement('p'),
      title: 'Test Title',
      buttonTitle: 'Confirmation Title',
      clickHandler: confirmClickHandler,
    });
  });

  it('should return close app dialog', () => {
    const action = closeAppDialog();

    expect(action).toEqual({
      type: 'CLOSE_APP_DIALOG',
    })
  });

  it('should return clear app dialog', () => {
    const action = clearAppDialog();

    expect(action).toEqual({
      type: 'CLEAR_APP_DIALOG',
    })
  });
});
