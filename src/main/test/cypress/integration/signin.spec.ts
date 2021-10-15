import faker from 'faker'
import * as Http from '../support/signin-mock'

const baseUrl: string = Cypress.config().baseUrl

describe('SignIn', () => {
  beforeEach(() => {
    cy.visit('signin')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'required')
    cy.getByTestId('submitEmail').should('have.attr', 'disabled')
    cy.getByTestId('emailStatus').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('emailStatus').contains('Por favor, informe um valor correto.')
    cy.getByTestId('submitEmail').should('have.attr', 'disabled')
  })

  it('Should present valid state if step email form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('emailStatus').should('not.have.descendants')
  })

  it('Should present error state if password form is invalid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type(faker.datatype.string(4))
    cy.getByTestId('passwordStatus').contains('Por favor, informe um valor correto.')
    cy.getByTestId('submitPassword').should('have.attr', 'disabled')
  })

  it('Should present valid state if step password form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('passwordStatus').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('submitPassword').click()
    cy.getByTestId('loading').should('not.exist')
    cy.getByTestId('mainError').should('exist')
    cy.getByTestId('mainError').should('contain.text', 'Invalid credentials')
    cy.url().should('eq', `${baseUrl}/signin`)
  })
  it('Should present UnexpectedError on 400', () => {
    Http.mockUnexpectedError()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('submitPassword').click()
    cy.getByTestId('loading').should('not.exist')
    cy.getByTestId('mainError').should('exist')
    cy.getByTestId('mainError').should('contain.text', "Something's wrong. try again soon.")
    cy.url().should('eq', `${baseUrl}/signin`)
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalid()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('submitPassword').click()
    cy.getByTestId('loading').should('not.exist')
    cy.getByTestId('mainError').should('exist')
    cy.getByTestId('mainError').should('contain.text', "Something's wrong. try again soon.")
    cy.url().should('eq', `${baseUrl}/signin`)
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: {
        accessToken: faker.git.commitSha()
      }
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('submitPassword').click()
    cy.getByTestId('loading').should('not.exist')
    cy.getByTestId('mainError').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('Should present mutiple submits', () => {
    Http.mockOk()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('submitEmail').click()
    cy.getByTestId('password').type(faker.datatype.string(6))
    cy.getByTestId('submitPassword').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })
})
