
import faker from 'faker'

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

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.datatype.string(2))
    cy.get('form > div:nth-child(1) > div span').contains('Por favor, informe um valor correto.')
    cy.getByTestId('email').type(faker.datatype.string())
    cy.get('form > div:nth-child(2) > div span').contains('Por favor, informe um valor correto.')
    cy.getByTestId('password').type(faker.datatype.string(5))
    cy.get('form > div:nth-child(3) > div span').contains('Por favor, informe um valor correto.')
    cy.getByTestId('passwordConfirm').type(faker.datatype.string(5))
    cy.get('form > div:nth-child(4) > div span').contains('Por favor, informe um valor correto.')
    cy.getByTestId('submit').should('have.attr', 'disabled')
  })
})
