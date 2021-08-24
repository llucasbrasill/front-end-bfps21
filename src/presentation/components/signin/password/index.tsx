import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Input from '../../input'
import Logo from '../../logo'
import Terms from '../../term'
import styles from '../styles.scss'

interface login {
  email: string
  password: string
  remember: boolean
  isLogin: number
  passwordError: string
}

type Props = {
  value: login
  setValue: Function
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const SignInPassword: React.FC<Props> = ({ value, setValue, handleSubmit }: Props) => {
  const formRef = React.useRef(null)
  const { t } = useTranslation()
  function handleChange ({ target }): void {
    setValue({ ...value, [target.id]: target.value })
  }

  return (
    <>
      <div className={`${styles.form} ${styles.password}`}>
        <header>
          <Logo />
        </header>

        <form data-testid="formPassword" onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.message}>
        <h2>{t('hello')}</h2>
          <p onClick={() => setValue({ ...value, isLogin: 0 })} className={styles.user}>
            {value.email}
          </p>
        </div>
          <label htmlFor="password">{t('enter your password')}</label>
          <Input className="password" name="password" type="password" id="password" placeholder={t('password')} value={value.password} onChange={handleChange} required />
          <span data-testid="passwordStatus">{value.passwordError}</span>
          <button type="submit" data-testid="submitPassword" disabled={!value.password && value.passwordError === ''}>{t('SignIn')}</button>
          <a href="#link" className={styles.createAccount}>
            {t('Forgot your password?')}
            {' '}
            <b>{t('Recover Password')}</b>
          </a>
        </form>

        <footer>
          <a href="#link" className={styles.recoveryPassword}>
          <Trans>I need help to sign in</Trans>
          </a>
        </footer>
      </div>
      <Terms />
    </>
  )
}

export default SignInPassword
