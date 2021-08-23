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
    isLogin: 0,
    isLoading: false
  })

  React.useEffect(() => {
    validation && setState(
      {
        ...state,
        emailError: validation.validate('email', state.email)
      }
    )
  }, [state.email])

  React.useEffect(() => {
    validation && setState(
      {
        ...state,
        passwordError: validation.validate('password', state.password)
      }
    )
  }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
    await authentication.auth({ email: state.email, password: state.password })
  }

  const handleClick = (step): void => {
    setState({ ...state, isLogin: step })
  }

  const presentation = [
    <><SignInEmail value={state} setValue={setState} handleClick={handleClick} /></>,
    <><SignInPassword value={state} setValue={setState} handleSubmit={handleSubmit}/></>
  ]

  return (
  <>
    <LoginLayout aside={<SignInSlogan />}>
      {state.isLoading ? <SignInLoading /> : presentation[state.isLogin]}
    </LoginLayout>
  </>
  )
}

export default SigninPage
