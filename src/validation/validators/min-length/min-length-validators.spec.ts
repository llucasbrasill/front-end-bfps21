import { InvalidFieldError } from '@/validation/errors'
import { MinLenghtValidation } from './min-lenght-validators'

describe('MinLenghtValidation', () => {
  test('should return error if value is invalid', () => {
    const sut = new MinLenghtValidation('field', 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const sut = new MinLenghtValidation('field', 5)
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
