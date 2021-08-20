import React from 'react'
import { SignInLoading, LoginLayout, SignInSlogan, SignInPassword, SignInEmail } from '@/presentation/components'

const SigninPage: React.FC = () => {
  const [login, setLogin] = React.useState({
    email: '',
    password: '',
    remember: false,
    isLogin: 0
  })

  const handleClick = (step): void => {
    setLogin({ ...login, isLogin: step })
  }

  const presentation = [
    <><SignInEmail value={login} setValue={setLogin} handleClick={handleClick} /></>,
    <><SignInPassword value={login} setValue={setLogin} handleClick={handleClick}/></>,
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

export default SigninPage
