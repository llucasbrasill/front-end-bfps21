import React from 'react'
import { render } from '@testing-library/react'
import { SignIn } from '../../index'
import { BrowserRouter } from 'react-router-dom'

describe('SingIn Page', () => {
  test('should start with initial state', () => {
    const { getByTestId } = render(
    <BrowserRouter>
        <SignIn />
    </BrowserRouter>)
    const emailWrapper = getByTestId('emailWrapper')
    expect(emailWrapper.childElementCount).toBe(3)
    const submitButtonEmail = getByTestId('submitEmail') as HTMLButtonElement
    expect(submitButtonEmail.disabled).toBe(true)
  })
})
