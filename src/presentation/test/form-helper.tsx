import faker from 'faker'
import { RenderResult, fireEvent, waitFor } from '@testing-library/react'
import '@/main/config/i18n/config'

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const field = sut.getByTestId(fieldName) as HTMLInputElement
  expect(field.classList.contains('requiredField')).toBeFalsy()
}
export const testStatusForFieldEmail = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const field = sut.getByTestId(fieldName) as HTMLInputElement
  expect(field.classList.contains('requiredField')).toBeTruthy()
}

export const testStatusForFieldPassword = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const field = sut.getByTestId(fieldName) as HTMLInputElement
  expect(field.classList.contains('requiredField')).toBeTruthy()
}

export const simulateEmailValidSubmit = (sut: RenderResult, email = faker.internet.email()): void => {
  populateEmailField(sut, email)
  const submitButtonEmail = sut.getByTestId('submitEmail') as HTMLButtonElement
  fireEvent.click(submitButtonEmail)
}

export const simulatePasswordValidSubmit = async (sut: RenderResult, password = faker.internet.password()): Promise<void> => {
  await populatePasswordField(sut, password)
  const passwordInput = sut.getByTestId('password') as HTMLInputElement
  expect(passwordInput.value).toBe(password)
  const submitButtonPassword = sut.getByTestId('submitPassword') as HTMLButtonElement
  await fireEvent.click(submitButtonPassword)
}

export const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  try {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    populatePasswordConfirmField(sut, password)

    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
  } catch {}
}

export const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const loadingComponent = sut.getByTestId(fieldName)
  expect(loadingComponent).toBeTruthy()
}

export const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email') as HTMLInputElement
  fireEvent.input(emailInput, { target: { value: email } })
}

export const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password') as HTMLInputElement
  fireEvent.input(passwordInput, { target: { value: password } })
}
export const populatePasswordConfirmField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('passwordConfirm') as HTMLInputElement
  fireEvent.input(passwordInput, { target: { value: password } })
}

export const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const field = sut.getByTestId(`${fieldName}Status`)
  expect(field.textContent).toBe(validationError || '')
}
