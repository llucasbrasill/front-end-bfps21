import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldValidation } from './compare-fields-validation'
import faker from 'faker'

const makeSut = (valueToCompare: string): CompareFieldValidation => new CompareFieldValidation(faker.database.column(), valueToCompare)

describe('CompareFieldValidation', () => {
  test('should return error if compare is invalid', async () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', async () => {
    const valueToCompare = faker.random.word()
    const sut = makeSut(valueToCompare)
    const error = sut.validate(valueToCompare)
    expect(error).toBeFalsy()
  })
})
