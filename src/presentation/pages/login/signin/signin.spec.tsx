import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { Validation } from '@/presentation/protocols/valitation'
import { SignIn } from '../../index'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  validationSpy: Validation
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object
  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
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
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })

  test('should call Validation with correct email password', async () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    fireEvent.input(emailInput, { target: { value: 'any_email@email.com' } })
    const submitButtonEmail = sut.getByTestId('submitEmail') as HTMLButtonElement

    fireEvent.click(submitButtonEmail)
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    await (() => expect(validationSpy.input).toEqual({
      password: 'any_password'
    }))
  })
})
