export {}

describe('Template Builder Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(localBaseUrl);
  });

  it('should add class to template', () => {
    cy.findByTestId('template-builder-nav').click();
    cy.findByTestId('save-template-button').should('be.disabled');
    cy.findByTestId('new-template-builder-item-button').click();
    cy.findByTestId('subject-checkbox').click();
    cy.findByTestId('subject-dropdown-list').click();
    cy.findByTestId('subject-menu-Editing Test Subject').click();
    cy.findByTestId('everyday-checkbox').click();
    cy.findByTestId('start-time-picker').find('input').clear().type('0130 pm');
    cy.findByTestId('end-time-picker').find('input').clear().type('0230 pm');
  });
});
