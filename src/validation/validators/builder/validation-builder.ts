import { FieldValidation } from '@/validation/protocols/field-validation'
import { EmailValidation, MinLenghtValidation, RequiredFiedlValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFiedlValidation(this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min (lenght: number): ValidationBuilder {
    this.validations.push(new MinLenghtValidation(this.fieldName, lenght))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
