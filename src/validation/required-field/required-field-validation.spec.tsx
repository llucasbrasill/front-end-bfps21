import { RequiredFiedlError } from '@/validation/errors'
import { RequiredFiedlValidation } from '@/validation/required-field/required-field-validation'
import faker from 'faker'
describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', async () => {
    const sut = new RequiredFiedlValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFiedlError())
  })

  test('should return falsy if field is not empty', async () => {
    const sut = new RequiredFiedlValidation('email')
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
