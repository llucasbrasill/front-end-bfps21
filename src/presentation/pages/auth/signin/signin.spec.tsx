import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { SignIn } from '@/presentation/pages'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { AuthenticationSpy, Helper, SaveAccessTokenMock, ValidationStub } from '@/presentation/test'
import '@/main/config/i18n/config'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signin'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
      <Router history={history}>
          <SignIn
            validation={validationStub}
            authentication={authenticationSpy}
            saveAccessToken={saveAccessTokenMock}
            />
      </Router>
  )

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

describe('SignIn Page', () => {
  afterEach(cleanup)
  test('should start with initial state', () => {
    const validationError = ''
    const { sut } = makeSut({ validationError })
    const emailWrapper = sut.getByTestId('emailWrapper')
    expect(emailWrapper.childElementCount).toBe(3)
    const submitButtonEmail = sut.getByTestId('submitEmail') as HTMLButtonElement
    expect(submitButtonEmail.disabled).toBe(true)
    Helper.simulateStatusForField(sut, 'email', validationError)
  })

  test('should call Validation with correct values email', async () => {
    const { sut } = makeSut()
    Helper.populateEmailField(sut)
    Helper.simulateStatusForField(sut, 'email')
  })

  test('should call error if Validation if falls', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateEmailField(sut)
    const emailStatus = sut.getByTestId('emailStatus')
    expect(emailStatus.textContent).toBe(validationError)
  })

  test('should a valid email must be given', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email') as HTMLFormElement
    Helper.populateEmailField(sut)
    expect(emailInput.reportValidity()).toBeTruthy()
  })

  test('should call Validation with correct email password', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    Helper.simulateEmailValidSubmit(sut, email)
    Helper.simulateStatusForField(sut, 'password')
    await Helper.simulatePasswordValidSubmit(sut, password)
  })

  test('should show loading on submit', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    Helper.simulateEmailValidSubmit(sut, email)
    Helper.simulateStatusForField(sut, 'password')
    await Helper.simulatePasswordValidSubmit(sut, password)

    const loadingComponent = sut.getByTestId('loading')
    expect(loadingComponent).toBeTruthy()
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    Helper.simulateEmailValidSubmit(sut, email)
    Helper.simulateStatusForField(sut, 'password')
    await Helper.simulatePasswordValidSubmit(sut, password)

    const loadingComponent = sut.getByTestId('loading')
    expect(loadingComponent).toBeTruthy()
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    Helper.simulateEmailValidSubmit(sut, email)
    Helper.populatePasswordField(sut, password)
    await Helper.simulatePasswordValidSubmit(sut, password)
    expect(authenticationSpy.callsCount).toBe(1)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('should call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    Helper.populateEmailField(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should preset error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    const email = faker.internet.email()
    const password = faker.internet.password()
    await Helper.simulateEmailValidSubmit(sut, email)
    await Helper.populatePasswordField(sut, password)
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    expect(passwordInput.value).toBe(password)
    const submitButtonPassword = sut.getByTestId('submitPassword') as HTMLButtonElement

    await act(async () => { await fireEvent.click(submitButtonPassword) })
    await waitFor(() => expect(sut.getByTestId('emailWrapper')).toBeDefined())
    const mainError = sut.getByTestId('mainError')
    expect(mainError.textContent).toBe(error.message)
    expect(sut.getByTestId('submitEmail')).toBeTruthy()
  })

  test('should acall SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await Helper.simulateEmailValidSubmit(sut, email)
    await Helper.simulatePasswordValidSubmit(sut, password)

    const loadingComponent = sut.getByTestId('loading')

    await waitFor(() => {
      expect(loadingComponent).toBeTruthy()
    })
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should preset error if SaveAccesToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(Promise.reject(error))
    const email = faker.internet.email()
    const password = faker.internet.password()
    await Helper.simulateEmailValidSubmit(sut, email)
    await Helper.populatePasswordField(sut, password)
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    expect(passwordInput.value).toBe(password)
    const submitButtonPassword = sut.getByTestId('submitPassword') as HTMLButtonElement

    await act(async () => { await fireEvent.click(submitButtonPassword) })
    await waitFor(() => expect(sut.getByTestId('emailWrapper')).toBeDefined())
    const mainError = sut.getByTestId('mainError')
    expect(mainError.textContent).toBe(error.message)
    expect(sut.getByTestId('submitEmail')).toBeTruthy()
  })

  test('should to to signup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')
    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
