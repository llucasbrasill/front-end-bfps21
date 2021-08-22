import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { SignIn } from '../../index'
import { BrowserRouter } from 'react-router-dom'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'
import '@/main/config/i18n/config'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(
    <BrowserRouter >
        <SignIn validation={validationStub} />
    </BrowserRouter>)

  return {
    sut,
    validationStub
  }
}

describe('Signnn Page', () => {
  afterEach(cleanup)
  test('should start with initial state', () => {
    const { sut } = makeSut()
    const emailWrapper = sut.getByTestId('emailWrapper')
    expect(emailWrapper.childElementCount).toBe(3)
    const submitButtonEmail = sut.getByTestId('submitEmail') as HTMLButtonElement
    expect(submitButtonEmail.disabled).toBe(true)
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    expect(emailInput.value).toBe('')
  })

  test('should call Validation with correct values email', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = ''
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId('emailStatus')
    await expect(emailStatus.textContent).toBe(validationStub.errorMessage)
  })

  test('should call Validation with correct email password', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = ''
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })

    const submitButtonEmail = sut.getByTestId('submitEmail') as HTMLButtonElement

    fireEvent.click(submitButtonEmail)

    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })

    await expect(passwordInput.value).toBe(password)
    const passwordStatus = sut.getByTestId('passwordStatus')
    await expect(passwordStatus.textContent).toBe(validationStub.errorMessage)
  })
})
