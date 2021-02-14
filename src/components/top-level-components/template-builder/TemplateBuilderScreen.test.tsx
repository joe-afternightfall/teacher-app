import React from 'react';
import {
  getStore,
  renderWithRedux,
} from '../../../configs/test-utils/mock-redux';
import TemplateBuilderScreen from './TemplateBuilderScreen';

describe('Template Builder Component', () => {
  it('should render with data', () => {
    const templateBuilderScreen = renderWithRedux(
      <TemplateBuilderScreen />,
      getStore({})
    );

    expect(
      templateBuilderScreen.getByText('Template Builder')
    ).toBeInTheDocument();
    expect(
      templateBuilderScreen.getByTestId('save-template-button')
    ).toBeDisabled();
  });
});
