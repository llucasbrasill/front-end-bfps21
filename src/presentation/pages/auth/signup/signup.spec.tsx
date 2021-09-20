import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import SignupPage from './signup'
import '@/main/config/i18n/config'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
        <SignupPage/>
  )

  return {
    sut
  }
}

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const field = sut.getByTestId(fieldName) as HTMLInputElement
  expect(field.querySelector('input').classList.length).toBe(1)
}

describe('SignUP Page', () => {
  test('should start with initial state', () => {
    const validationError = ''
    const { sut } = makeSut()
    testChildCount(sut, 'errorWrapper', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirm', validationError)
  })
})
