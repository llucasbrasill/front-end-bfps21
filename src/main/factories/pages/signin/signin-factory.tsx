
import React from 'react'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { SignIn } from '@/presentation/pages'
import { makeSignInValidation } from './signin-validation-factory'
import { makeLocalSaveAccessToken } from '../../usecases/save-access-token/save-access-token-factory'

export const makeSignIn: React.FC = () => {
  return (
        <SignIn authentication={makeRemoteAuthentication()}
            validation={makeSignInValidation()}
            saveAccessToken={makeLocalSaveAccessToken()}
        />
  )
}
