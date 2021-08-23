import React from 'react'
import { SignInLoading, LoginLayout, SignInSlogan, SignInPassword, SignInEmail } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const SigninPage: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    remember: false,
    emailError: '',
    passwordError: '',
    isLogin: 0
  })

  React.useEffect(() => {
    setState(
      {
        ...state,
        emailError: validation.validate('email', state.email),
        passwordError: validation.validate('password', state.password)
      }
    )
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setState({ ...state, isLogin: 2 })
    await authentication.auth({ email: state.email, password: state.password })
  }

  const handleClick = (step): void => {
    setState({ ...state, isLogin: step })
  }

  const presentation = [
    <><SignInEmail value={state} setValue={setState} handleClick={handleClick} /></>,
    <><SignInPassword value={state} setValue={setState} handleFormSubmit={handleSubmit}/></>,
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

export default SigninPage
