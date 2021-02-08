// import React from 'react';
/// <reference types="Cypress" />

describe('New Subject Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  it('should create new test subject', () => {
    cy.visit(localBaseUrl);
    cy.get('[data-testid="add-new-subject"]').click();
    cy.get('[data-testid="subject-name"]').type('Test Subject');
    cy.get('[data-testid="subject-builder-save-button"]').should('be.disabled');
    cy.get('[data-testid="Object"]').click();
    cy.get('[data-testid="Deep Orange"]').click();
    cy.get('[data-testid="subject-builder-save-button"]').should('be.enabled');
    cy.get('[data-testid="subject-builder-save-button"]').click();
  })
})