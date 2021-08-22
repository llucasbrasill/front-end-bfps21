import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { Validation } from '@/presentation/protocols/valitation'
import { SignIn } from '../../index'
import { BrowserRouter } from 'react-router-dom'
import { ValidationSpy } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: Validation
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(
    <BrowserRouter>
        <SignIn validation={validationSpy} />
    </BrowserRouter>)

  return {
    sut,
    validationSpy
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

  test('should call Validation with correct values email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('should call Validation with correct email password', async () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
    const submitButtonEmail = sut.getByTestId('submitEmail') as HTMLButtonElement

    fireEvent.click(submitButtonEmail)
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    await (() => expect(validationSpy.fieldName).toBe('password'))
    await (() => expect(validationSpy.fieldValue).toBe(password))
  })
})
