import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { SignIn } from '../../index'
import { BrowserRouter } from 'react-router-dom'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import '@/main/config/i18n/config'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <BrowserRouter >
        <SignIn validation={validationStub} authentication={authenticationSpy} />
    </BrowserRouter>)

  return {
    sut,
    authenticationSpy
  }
}

const simulateEmailValidSubmit = (sut: RenderResult, email = faker.internet.email()): void => {
  populateEmailField(sut, email)
  const submitButtonEmail = sut.getByTestId('submitEmail') as HTMLButtonElement
  fireEvent.click(submitButtonEmail)
}

const simulatePasswordValidSubmit = async (sut: RenderResult, password = faker.internet.password()): Promise<void> => {
  populatePasswordField(sut, password)
  const passwordInput = sut.getByTestId('password') as HTMLInputElement
  await expect(passwordInput.value).toBe(password)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email') as HTMLInputElement
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password') as HTMLInputElement
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const field = sut.getByTestId(`${fieldName}Status`)
  expect(field.textContent).toBe(validationError || '')
}

describe('Signnn Page', () => {
  afterEach(cleanup)
  test('should start with initial state', () => {
    const validationError = ''
    const { sut } = makeSut({ validationError })
    const emailWrapper = sut.getByTestId('emailWrapper')
    expect(emailWrapper.childElementCount).toBe(3)
    const submitButtonEmail = sut.getByTestId('submitEmail') as HTMLButtonElement
    expect(submitButtonEmail.disabled).toBe(true)
    simulateStatusForField(sut, 'email', validationError)
  })

  test('should call Validation with correct values email', async () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })

  test('should call error if Validation if falls', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    const emailStatus = sut.getByTestId('emailStatus')
    await expect(emailStatus.textContent).toBe(validationError)
  })

  test('should a valid email must be given', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email') as HTMLFormElement
    populateEmailField(sut)
    await expect(emailInput.reportValidity()).toBeTruthy()
  })

  test('should call Validation with correct email password', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateEmailValidSubmit(sut, email)
    await simulatePasswordValidSubmit(sut, password)

    simulateStatusForField(sut, 'password')
  })

  test('should show loading on submit', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateEmailValidSubmit(sut, email)
    await simulatePasswordValidSubmit(sut, password)

    simulateStatusForField(sut, 'password')
    const submitButtonPassword = sut.getByTestId('submitPassword') as HTMLButtonElement
    await fireEvent.click(submitButtonPassword)
    const loadingComponent = sut.getByTestId('loading')
    await expect(loadingComponent).toBeTruthy()
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateEmailValidSubmit(sut, email)
    await simulatePasswordValidSubmit(sut, password)

    simulateStatusForField(sut, 'password')
    const submitButtonPassword = sut.getByTestId('submitPassword') as HTMLButtonElement
    await fireEvent.click(submitButtonPassword)
    const loadingComponent = sut.getByTestId('loading')
    await expect(loadingComponent).toBeTruthy()
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
