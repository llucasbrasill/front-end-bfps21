import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { SignIn } from '../../index'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
}
const makeSut = (): SutTypes => {
  const sut = render(
    <BrowserRouter>
        <SignIn />
    </BrowserRouter>)

  return {
    sut
  }
}

describe('Signnn Page', () => {
  test('should start with initial state', () => {
    const { sut } = makeSut()
    const emailWrapper = sut.getByTestId('emailWrapper')
    expect(emailWrapper.childElementCount).toBe(3)
    const submitButtonEmail = sut.getByTestId('submitEmail') as HTMLButtonElement
    expect(submitButtonEmail.disabled).toBe(true)
    const emailInput = sut.getByTestId('emailInput') as HTMLInputElement
    expect(emailInput.value).toBe('')
  })
})
