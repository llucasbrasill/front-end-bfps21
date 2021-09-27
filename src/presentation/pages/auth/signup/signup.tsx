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
    name: '',
    email: '',
    password: '',
    isFormInvalid: true,
    passwordConfirm: '',
    isLoading: false,
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmError: '',
    mainError: ''
  })

  React.useEffect(() => {
    const { name, email, password, passwordConfirm } = state
    const formData = { name, email, password, passwordConfirm }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', FormData)
    const passwordConfirmError = validation.validate('passwordConfirm', FormData)
    setState({
      ...state,
      passwordError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmError
    })
  }, [state.name, state.email, state.password, state.passwordConfirm])

  const handleClick = async (step: number): Promise<void> => {
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({ ...state, isLogin: step })
      const account = await addAccount.add({
        name: state.name,
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
