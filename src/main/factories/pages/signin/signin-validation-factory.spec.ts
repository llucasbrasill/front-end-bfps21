import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { makeSignInValidation } from './signin-validation-factory'

describe('SignInValidationFactory', () => {
  test('should make compose ValidationCompose with correct validations ', () => {
    const composite = makeSignInValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(6).build()
    ]))
  })
})
