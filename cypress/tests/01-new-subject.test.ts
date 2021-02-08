export {}

describe('New Subject Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(localBaseUrl);
  });

  it('should create new test subject', () => {
    cy.get('[data-testid="add-new-subject"]').click();
    cy.get('[data-testid="subject-name"]').type('Test Subject');
    cy.get('[data-testid="subject-builder-save-button"]').should('be.disabled');
    cy.get('[data-testid="Object"]').click();
    cy.get('[data-testid="Deep Orange"]').click();
    cy.get('[data-testid="subject-builder-save-button"]').should('be.enabled');
    cy.get('[data-testid="subject-builder-save-button"]').click();
  });

  it('should block user from saving when duplicate exists', () => {
    cy.get('[data-testid="add-new-subject"]').click();
    cy.get('[data-testid="subject-name"]').type('Test Subject');
    cy.get('[data-testid="subject-builder-save-button"]').should('be.disabled');
  });

  it('should allow for editing subject', () => {
    cy.get('[data-testid="edit-Test Subject"]').click();
    cy.get('[data-testid="subject-name"]').find('input').clear().type('Editing Test Subject');
    cy.get('[data-testid="subject-builder-save-button"]').should('be.enabled');
    cy.get('[data-testid="subject-builder-save-button"]').click();
  });

  // todo: add test to check for snackbar message after saving
});
