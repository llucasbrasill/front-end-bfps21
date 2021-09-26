
import faker from 'faker'
import { AddAccountParams } from '../usecases'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: password,
    passwordConfirm: password
  }
}
