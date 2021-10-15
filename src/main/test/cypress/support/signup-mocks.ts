import * as Helper from './form-mocks'
import faker from 'faker'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError('/api/signup')
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError('POST', '/api/signup')
export const mockInvalid = (): void => Helper.mockOk('POST', '/api/signup', { invalid: faker.git.commitSha() })
