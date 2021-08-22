import React from 'react'
import {
  LoginLayout,
  SignInLoading,
  SignInSlogan,
  SignUp
} from '@/presentation/components'
import ChangeLanguage from '@/presentation/components/translations/changeLanguage'

const SignupPage: React.FC = () => {
  const [login, setLogin] = React.useState({
    email: '',
    password: '',
    passwordConfirm: '',
    isLogin: 0
  })

  const handleClick = (step): void => {
    setLogin({ ...login, isLogin: step })
  }

  const presentation = [
    <>
      <SignUp value={login} setValue={setLogin} handleClick={handleClick} />
    </>,
    <>
      <SignInLoading />
    </>
  ]

  return (
    <>
      <LoginLayout aside={<SignInSlogan />}>
        {presentation[login.isLogin]}
      </LoginLayout>
      <ChangeLanguage />
    </>
  )
}

export default SignupPage
