import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldValidation } from './compare-fields-validation'
import faker from 'faker'

const makeSut = (field: string, fieldToCompare: string): CompareFieldValidation => new CompareFieldValidation(field, fieldToCompare)

describe('CompareFieldValidation', () => {
  test('should return error if compare is invalid', async () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', async () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
