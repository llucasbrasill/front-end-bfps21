import { RequiredFiedlError } from '@/validation/errors'
import { RequiredFiedlValidation } from '@/validation/validators/required-field/required-field-validation'
import faker from 'faker'

const makeSut = (field): RequiredFiedlValidation => new RequiredFiedlValidation(field)

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', async () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFiedlError())
  })

  test('should return falsy if field is not empty', async () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
