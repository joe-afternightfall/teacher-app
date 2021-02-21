import React from 'react';
import BuilderControls from './BuilderControls';
import {
  renderWithRedux,
  getTemplateBuilderStore,
} from '../../../../../configs/test-utils/mock-redux';
import { buildLessonPlanners } from '../../../../../configs/test-utils/test-util';

describe('Builder Controls Component', () => {
  it('should render with buttons', () => {
    const store = getTemplateBuilderStore({
      templateBuilder: buildLessonPlanners(1)[0],
      boardChanged: false,
    });

    const builderControls = renderWithRedux(<BuilderControls />, store);

    expect(builderControls.getByText('Template Builder')).toBeInTheDocument();
    expect(builderControls.getByText('Add New')).toBeInTheDocument();
    expect(
      builderControls.getByTestId('save-template-button')
    ).toBeInTheDocument();
  });

  it('should dispatch Add New action', () => {
    const store = getTemplateBuilderStore({
      templateBuilder: buildLessonPlanners(1)[0],
      boardChanged: false,
    });

    const builderControls = renderWithRedux(<BuilderControls />, store);

    builderControls.getByText('Add New').click();
    expect(store.getActions()[0].maxWidth).toEqual('sm');
    expect(store.getActions()[0].buttonTitle).toEqual('Save');
    expect(store.getActions()[0].title).toEqual('Add Item to Template');
    expect(store.getActions()[0].titleColor).toEqual('#3baafc');
    expect(store.getActions()[0].type).toEqual('DISPLAY_APP_DIALOG');
  });

  it('should dispatch Save action', () => {
    const store = getTemplateBuilderStore({
      templateBuilder: buildLessonPlanners(1)[0],
      boardChanged: false,
    });

    const builderControls = renderWithRedux(<BuilderControls />, store);

    builderControls.getByTestId('save-template-button').click();
  });
});
