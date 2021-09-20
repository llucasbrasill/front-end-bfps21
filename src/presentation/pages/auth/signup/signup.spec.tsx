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

describe('SignUP Page', () => {
  afterEach(cleanup)
  test('should start with initial state', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'errorWrapper', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', 'Required field')
    Helper.testStatusForField(sut, 'password', 'Required field')
    Helper.testStatusForField(sut, 'passwordConfirm', 'Required field')
  })
})
