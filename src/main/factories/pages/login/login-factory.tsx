
import React from 'react'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { SignIn } from '@/presentation/pages'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
        <SignIn authentication={makeRemoteAuthentication()}
            validation={makeLoginValidation()}
        />
  )
}
