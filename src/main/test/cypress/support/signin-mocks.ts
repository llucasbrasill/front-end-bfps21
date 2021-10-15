import * as Helper from './form-mocks'
import faker from 'faker'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError('/api/login')
export const mockEmailInUseError = (): void => Helper.mockEmailInUseError('/api/login')
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError('POST', '/api/login')
export const mockOk = (): void => Helper.mockOk('POST', '/api/login', { accessToken: faker.git.commitSha() })
export const mockInvalid = (): void => Helper.mockOk('POST', '/api/login', { invalid: faker.git.commitSha() })
