export {}

describe('New Subject Test', () => {
  const localBaseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(localBaseUrl);
  });

  it('should create new test subject', () => {
    cy.findByTestId('add-new-subject').click();
    cy.findByTestId('subject-name').type('Test Subject');
    cy.findByTestId('subject-builder-save-button').should('be.disabled');
    cy.findByTestId('Object').click();
    cy.findByTestId('Deep Orange').click();
    cy.findByTestId('subject-builder-save-button').should('be.enabled');
    cy.findByTestId('subject-builder-save-button').click();
  });

  it('should block user from saving when duplicate exists', () => {
    cy.findByTestId('add-new-subject').click();
    cy.findByTestId('subject-name').type('Test Subject');
    cy.findByTestId('subject-builder-save-button').should('be.disabled');
  });

  it('should allow for editing subject', () => {
    cy.findByTestId('edit-Test Subject').click();
    cy.findByTestId('subject-name').find('input').clear().type('Editing Test Subject');
    cy.findByTestId('subject-builder-save-button').should('be.enabled');
    cy.findByTestId('subject-builder-save-button').click();
  });

  // todo: add test to check for snackbar message after saving
});
