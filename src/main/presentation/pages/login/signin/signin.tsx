import React from 'react'
import LoginLayout from '@/main/presentation/components/layout/login'
import SignIn from '@/main/presentation/components/signin/email'
import SignInPassword from '@/main/presentation/components/signin/password/password'
import Slogan from '@/main/presentation/components/signin/slogan'
import Loading from '@/main/presentation/components/signin/loading'

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
    <><SignIn value={login} setValue={setLogin} handleClick={handleClick} /></>,
    <><SignInPassword value={login} setValue={setLogin} handleClick={handleClick}/></>,
    <><Loading /></>
  ]

  return (
  <>
    <LoginLayout aside={<Slogan />}>
      {presentation[login.isLogin]}
    </LoginLayout>
  </>
  )
}

export default SigninPage
