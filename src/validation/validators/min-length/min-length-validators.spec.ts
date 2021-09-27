import { InvalidFieldError } from '@/validation/errors'
import { MinLenghtValidation } from './min-lenght-validators'
import faker from 'faker'

const makeSut = (field: string): MinLenghtValidation => new MinLenghtValidation(field, 6)

describe('MinLenghtValidation', () => {
  test('should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.datatype.string(5) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.datatype.string(6) })
    expect(error).toBeFalsy()
  })

  test('should return falsy if field does exists in schema', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [faker.database.column()]: faker.datatype.string(6) })
    expect(error).toBeFalsy()
  })
})
