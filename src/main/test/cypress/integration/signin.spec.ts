import faker from 'faker'

describe('SignIn', () => {
  beforeEach(() => {
    cy.visit('signin')
  })

  it('Shoud load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'required')
    cy.getByTestId('submitEmail').should('have.attr', 'disabled')
    cy.getByTestId('emailStatus').should('not.have.descendants')
  })

  it('Shoud preset error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('emailStatus').contains('Por favor, informe um valor correto.')
    cy.getByTestId('submitEmail').should('have.attr', 'disabled')
  })

  it('Shoud preset valid state if step email form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('emailStatus').should('not.have.descendants')
  })
})
