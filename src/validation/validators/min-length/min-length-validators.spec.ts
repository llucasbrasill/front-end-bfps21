import { InvalidFieldError } from '@/validation/errors'
import { MinLenghtValidation } from './min-lenght-validators'
import faker from 'faker'

const makeSut = (): MinLenghtValidation => new MinLenghtValidation(faker.database.column(), 6)

describe('MinLenghtValidation', () => {
  test('should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.datatype.string(5))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.datatype.string(6))
    expect(error).toBeFalsy()
  })
})
