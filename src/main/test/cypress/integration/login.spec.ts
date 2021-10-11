describe('Login', () => {
  beforeEach(() => {
    cy.visit('signin')
  })

  it('Shoud load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'required')
    cy.getByTestId('submitEmail').should('have.attr', 'disabled')
    cy.getByTestId('emailStatus').should('not.have.descendants')
  })
})
