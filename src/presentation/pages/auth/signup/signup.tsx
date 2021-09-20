import React from 'react'
import {
  LoginLayout,
  SignInLoading,
  SignInSlogan,
  SignUp
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const SignupPage: React.FC<Props> = ({ validation }: Props) => {
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

  const handleClick = (step: number): void => {
    setState({ ...state, isLogin: step })
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
