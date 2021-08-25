import { RequiredFiedlError } from '@/validation/errors'
import { RequiredFiedlValidation } from '@/validation/required-field/required-field-validation'

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', async () => {
    const sut = new RequiredFiedlValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFiedlError())
  })
})
