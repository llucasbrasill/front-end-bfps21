import faker from 'faker'

export const SimulateSubmit = (): void => {
  const password = faker.internet.password()
  cy.getByTestId('name').type(faker.name.findName())
  cy.get('form > div:nth-child(1) > div > span').should('not.have.text', 'Por favor, informe um valor correto.')
  cy.getByTestId('email').type(faker.internet.email())
  cy.get('form > div:nth-child(2) > div > span').should('not.have.text', 'Por favor, informe um valor correto.')
  cy.getByTestId('password').type(password)
  cy.get('form > div:nth-child(3) > div > span').should('not.have.text', 'Por favor, informe um valor correto.')
  cy.getByTestId('passwordConfirm').type(password)
  cy.get('form > div:nth-child(4) > div > span').should('not.have.text', 'Por favor, informe um valor correto.')
  cy.getByTestId('submit').should('not.have.attr', 'disabled')
  cy.getByTestId('submit').click()
}
