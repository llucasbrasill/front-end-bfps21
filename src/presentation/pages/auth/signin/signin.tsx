import React from 'react'
import { SignInLoading, LoginLayout, SignInSlogan, SignInPassword, SignInEmail } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
}

const SigninPage: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory()
  const [state, setState] = React.useState({
    email: '',
    password: '',
    remember: false,
    emailError: '',
    passwordError: '',
    isLogin: 0,
    isLoading: false,
    mainError: ''
  })

  React.useEffect(() => {
    validation && setState(
      { ...state, emailError: validation.validate('email', state.email) }
    )
  }, [state.email])

  React.useEffect(() => {
    validation && setState(
      { ...state, passwordError: validation.validate('password', state.password) }
    )
  }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }

      setState({ ...state, isLoading: true })
      const account = await authentication.auth({ email: state.email, password: state.password })
      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLogin: 0,
        mainError: error.message,
        isLoading: false
      })
    }
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