
import { EmailValidation, MinLenghtValidation, RequiredFiedlValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFiedlValidation(field)])
  })

  test('should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('should return MinLengthValidation', () => {
    const field = faker.database.column()
    const lenght = faker.datatype.number()
    const validations = sut.field(field).min(lenght).build()
    expect(validations).toEqual([new MinLenghtValidation(field, lenght)])
  })

  test('should return a list of validations', () => {
    const field = faker.database.column()
    const lenght = faker.datatype.number()
    const validations = sut.field(field).required().min(lenght).email().build()

    expect(validations).toEqual([
      new RequiredFiedlValidation(field),
      new MinLenghtValidation(field, lenght),
      new EmailValidation(field)

    ])
  })
})
