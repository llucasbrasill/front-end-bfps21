import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'
import { makeSignUpValidation } from './signin-validation-factory'

describe('SignInValidationFactory', () => {
  test('should make compose ValidationCompose with correct validations ', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(3).build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(6).build(),
      ...Builder.field('passwordComfirmation').required().min(6).build()
    ]))
  })
})
