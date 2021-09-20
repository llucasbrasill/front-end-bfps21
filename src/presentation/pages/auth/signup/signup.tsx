import React from 'react'
import {
  LoginLayout,
  SignInLoading,
  SignInSlogan,
  SignUp
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignupPage: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, setState] = React.useState({
    isLogin: 0,
    email: '',
    password: '',
    passwordConfirm: '',
    isLoading: false,
    emailError: '',
    passwordError: '',
    passwordConfirmError: '',
    mainError: ''
  })

  React.useEffect(() => {
    setState({ ...state, emailError: validation.validate('email', state.email) })
  }, [state.email])

  React.useEffect(() => {
    setState({ ...state, passwordError: validation.validate('password', state.password) })
  }, [state.password])

  const handleClick = async (step: number): Promise<void> => {
    setState({ ...state, isLogin: step })
    await addAccount.add({
      email: state.email,
      password: state.password,
      passwordConfirm: state.passwordConfirm
    })
  }

  const presentation = [
    <><SignUp value={state} setValue={setState} handleClick={handleClick} /></>,
    <><SignInLoading /></>
  ]

  return (
    <>
      <LoginLayout aside={<SignInSlogan />}>
        {presentation[state.isLogin]}
      </LoginLayout>
    </>
  )
}

export default SignupPage
