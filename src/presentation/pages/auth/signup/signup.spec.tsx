import React from 'react'
import faker from 'faker'
import { cleanup, render, RenderResult } from '@testing-library/react'
import Signup from './signup'
import '@/main/config/i18n/config'
import { Helper, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}
type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
        <Signup
          validation={validationStub}
        />
  )
  return {
    sut
  }
}

describe('SignUp Page', () => {
  afterEach(cleanup)
  test('should start with initial state', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'errorWrapper', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirm', 'Required field')
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    Helper.populateEmailField(sut, 'email')
    Helper.testStatusForFieldEmail(sut, 'email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    Helper.populatePasswordField(sut, 'password')
    Helper.testStatusForFieldPassword(sut, 'password', validationError)
  })

  test('should show passwordConfirm state if Validation success', () => {
    const { sut } = makeSut()
    Helper.populatePasswordConfirmField(sut, 'passwordConfim')
    Helper.testStatusForField(sut, 'passwordConfirm')
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateEmailField(sut, 'email')
    Helper.populatePasswordField(sut, 'password')
    Helper.populatePasswordConfirmField(sut, 'passwordConfim')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('should show loading on submit', async () => {
    const { sut } = makeSut()
    await Helper.simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'loading')
  })
})
