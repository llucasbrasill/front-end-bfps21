
describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'required')
    cy.getByTestId('email').should('have.attr', 'required')
    cy.getByTestId('password').should('have.attr', 'required')
    cy.getByTestId('passwordConfirm').should('have.attr', 'required')
    cy.getByTestId('submit').should('have.attr', 'disabled')
  })
})
