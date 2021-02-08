// import React from 'react';
/// <reference types="Cypress" />

describe('Edit Subject Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  it('should allow for editing subject', () => {
    cy.visit(localBaseUrl);
    cy.get('[data-testid="edit-Test Subject"]').click();
    const subjectNameField = cy.get('[data-testid="subject-name"]');
    subjectNameField.clear();
    subjectNameField.type('Editing Test Subject');
    cy.get('[data-testid="subject-builder-save-button"]').should('be.enabled');
    cy.get('[data-testid="subject-builder-save-button"]').click();
  })
})