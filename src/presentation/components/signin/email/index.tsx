import React from 'react'
import Input from '../../input'
import Logo from '../../logo'
import Terms from '../../term'
import styles from '../styles.scss'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'

interface login {
  email: string
  password: string
  remember: boolean
  isLogin: number
  emailError: string
  mainError: string
}

type Props = {
  value: login
  setValue: Function
  handleClick: Function
}

const SignIn: React.FC<Props> = ({ value, setValue, handleClick }: Props) => {
  const { t } = useTranslation()
  const formRef = React.useRef(null)
  const handleSubmit = (): void => {
    formRef.current.reportValidity()
    handleClick(1)
  }

  function handleChange ({ target }): void {
    setValue({ ...value, [target.id]: target.value })
  }

  return (
    <>
      <div data-testid="emailWrapper" className={styles.form}>
        <header>
          <Logo />
          <h2>{t('Access your account')}</h2>
        </header>

        <form onSubmit={(event) => { event.preventDefault(); handleSubmit() }} ref={formRef}>
          <label htmlFor="email">{t('email')}</label>
          <Input
            className={`email ${value.email && (value.emailError ? styles.invalid : styles.valid)}`}
            id="email"
            type="email"
            name="email"
            placeholder={t('enter your email')}
            value={value.email}
            onChange={handleChange}
            required
          />
          <div className={styles.errorWrapper}>
            <span data-testid="emailStatus">{value.email && value.emailError}</span>
            { value.mainError && <span data-testid="mainError">{value.mainError}</span> }
          </div>
          <button type="submit" data-testid="submitEmail" disabled={!value.email}>{t('continue')}</button>

          <Link to="/signup" data-testid="signup" className={styles.createAccount}>
            <Trans>Não tem conta? <b>Teste grátis por 7 dias.</b></Trans>
          </Link>
        </form>

        <footer>
          <Link to="/" className={styles.recoveryPassword}>
            <Trans>I need help to sign in</Trans>
          </Link>
        </footer>
      </div>

      <Terms />
    </>
  )
}

export default SignIn
