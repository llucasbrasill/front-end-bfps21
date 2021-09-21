import React from 'react'
import faker from 'faker'
import { cleanup, render, RenderResult } from '@testing-library/react'
import Signup from './signup'
import '@/main/config/i18n/config'
import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}
type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const sut = render(
        <Signup
          validation={validationStub}
          addAccount={addAccountSpy}
        />
  )
  return {
    sut,
    addAccountSpy
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

  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await Helper.simulateValidSubmit(sut, email, password)

    const loadingComponent = sut.getByTestId('loading')
    expect(loadingComponent).toBeTruthy()
    expect(addAccountSpy.params).toEqual({
      email,
      password,
      passwordConfirm: password
    })
  })

  test('should call  AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await Helper.simulateValidSubmit(sut, email, password)
    await Helper.simulateValidSubmit(sut, email, password)

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const { sut, addAccountSpy } = makeSut({ validationError })
    await Helper.simulateValidSubmit(sut, email, password)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should preset error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockReturnValueOnce(Promise.reject(error))
    const email = faker.internet.email()
    const password = faker.internet.password()
    await Helper.simulateValidSubmit(sut, email, password)

    const loadingComponent = sut.getByTestId('mainError')
    expect(loadingComponent.textContent).toBe(error.message)
    Helper.testChildCount(sut, 'errorWrapper', 1)
  })
})
