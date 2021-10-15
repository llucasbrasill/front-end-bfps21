import { Method } from 'axios'
import faker from 'faker'

export const mockInvalidCredentialsError = (url: string): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: faker.datatype.string(6)
    }
  })
}

export const mockUnexpectedError = (method: Method, url: string): void => {
  cy.intercept(method, url, {
    statusCode: 400,
    body: {
      error: faker.helpers.randomize([400, 404, 500])
    }
  }).as('request')
}

export const mockOk = (method: Method, url: string, response: any): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response
  }).as('request')
}
