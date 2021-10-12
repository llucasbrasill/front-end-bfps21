import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

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

  it('Shoud preset error state if password form is invalid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type(faker.datatype.string(4))
    cy.getByTestId('passwordStatus').contains('Por favor, informe um valor correto.')
    cy.getByTestId('submitPassword').should('have.attr', 'disabled')
  })

  it('Shoud preset valid state if step password form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('passwordStatus').should('not.have.descendants')
  })

  it('Shoud preset error if invalid credentials are provided', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('submitPassword').click()
    cy.getByTestId('loading').should('exist')
    cy.getByTestId('loading').should('not.exist')
    cy.getByTestId('mainError').should('exist')
    cy.url().should('eq', `${baseUrl}/signin`)
  })

  it('Shoud preset save accessToken if valid credentials are provided', () => {
    cy.getByTestId('email').type('lucas@llucasbrasill.com')
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type('aaaaaa')
    cy.getByTestId('submitPassword').click()
    cy.getByTestId('loading').should('exist')
    cy.getByTestId('loading').should('not.exist')
    cy.getByTestId('mainError').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})
