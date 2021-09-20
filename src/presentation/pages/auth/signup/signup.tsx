import React from 'react'
import {
  LoginLayout,
  SignInLoading,
  SignInSlogan,
  SignUp
} from '@/presentation/components'

const SignupPage: React.FC = () => {
  const [login, setLogin] = React.useState({
    isLogin: 0,
    email: '',
    password: '',
    passwordConfirm: '',
    isLoading: false,
    emailError: 'Required field',
    passwordError: 'Required field',
    passwordConfirmError: 'Required field',
    mainError: ''
  })

  const handleClick = (step: number): void => {
    setLogin({ ...login, isLogin: step })
  }

  const presentation = [
    <><SignUp value={login} setValue={setLogin} handleClick={handleClick} /></>,
    <><SignInLoading /></>
  ]

  return (
    <>
      <LoginLayout aside={<SignInSlogan />}>
        {presentation[login.isLogin]}
      </LoginLayout>
    </>
  )
}

export default SignupPage
