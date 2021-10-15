import * as Helper from './form-mocks'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError('/api/signup')
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError('POST', '/api/signup')
