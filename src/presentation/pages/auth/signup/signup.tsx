import React from 'react'
import {
  LoginLayout,
  SignInLoading,
  SignInSlogan,
  SignUp
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { useHistory } from 'react-router'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignupPage: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
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
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLogin: step })
      const account = await addAccount.add({
        email: state.email,
        password: state.password,
        passwordConfirm: state.passwordConfirm
      })

      await saveAccessToken.save(account.accessToken)
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
