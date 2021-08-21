import React from 'react'
import { SignInLoading, LoginLayout, SignInSlogan, SignInPassword, SignInEmail } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/valitation'

type Props = {
  validation: Validation
}

const SigninPage: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    remember: false,
    isLogin: 0
  })

  React.useEffect(() => {
    validation.validate({ email: state.email })
  }, [state.email])

  const handleClick = (step): void => {
    setState({ ...state, isLogin: step })
  }

  const presentation = [
    <><SignInEmail value={state} setValue={setState} handleClick={handleClick} /></>,
    <><SignInPassword value={state} setValue={setState} handleClick={handleClick}/></>,
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
