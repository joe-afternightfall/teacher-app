import React from 'react';
import SubjectBuilder from './SubjectBuilder';
import {
  getStore,
  renderWithRedux,
} from '../../../configs/test-utils/mock-redux';

describe('Subject Builder Component', () => {
  it('should render with components', async () => {
    const store = getStore({});
    const subjectBuilder = renderWithRedux(<SubjectBuilder />, store);

    expect(subjectBuilder.getByText('Subject Name')).toBeInTheDocument();
    expect(subjectBuilder.getByText('Subject Icon')).toBeInTheDocument();
    expect(subjectBuilder.getByTestId('subject-name')).toBeInTheDocument();

    subjectBuilder.getByTestId('Palette').click();
    // await userEvent.type(subjectBuilder.getByTestId('subject-name'), 'Hello, World!');
  });
});
