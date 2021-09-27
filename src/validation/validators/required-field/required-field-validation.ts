import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFiedlError } from '@/validation/errors/required-field-error'

export class RequiredFiedlValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    return input[this.field] ? null : new RequiredFiedlError()
  }
}
