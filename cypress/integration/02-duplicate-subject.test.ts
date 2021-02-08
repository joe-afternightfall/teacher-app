// import React from 'react';
/// <reference types="Cypress" />

describe('Duplicate Subject Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  it('should block user from saving when duplicate exists', () => {
    cy.visit(localBaseUrl);
    cy.get('[data-testid="add-new-subject"]').click();
    cy.get('[data-testid="subject-name"]').type('Test Subject');
    cy.get('[data-testid="subject-builder-save-button"]').should('be.disabled');
  })
})