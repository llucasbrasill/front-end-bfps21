import React from 'react'
import Input from '../input'
import Logo from '../logo'
import Terms from '../term'
import styles from './styles.scss'
import { useTranslation, Trans } from 'react-i18next'

interface login {
  email: string
  password: string
  passwordConfirm: string
  isLogin: number
  emailError: string
  passwordError: string
  passwordConfirmError: string
  isLoading: boolean
  mainError: string
}

type Props = {
  value: login
  setValue: Function
  handleClick: Function
}

const SignUp: React.FC<Props> = ({ value, setValue, handleClick }: Props) => {
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
      <div data-testid="signupWrapper" className={styles.form}>
        <header>
          <Logo />
          <h2>{t('experimente')}</h2>
        </header>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit()
          }}
          ref={formRef}
        >
          <div>
            <label htmlFor="email">{t('email')}</label>
            <Input
              className={`email ${value.email && (value.emailError ? styles.requiredField : 'validty-field')}`}
              id="email"
              type="email"
              name="email"
              placeholder={t('enter your email')}
              value={value.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="password">{t('password')}</label>
            <Input

              className={`password ${value.password && (value.passwordError ? styles.requiredField : 'validty-field')}`}
              id="password"
              type="password"
              name="password"
              placeholder={t('enter your password')}
              value={value.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="passwordConfirm">{t('passwordConfirm')}</label>

            <Input

              className={`passwordConfirm ${value.passwordConfirm && (value.passwordConfirmError ? styles.requiredField : 'validty-field')}`}
              id="passwordConfirm"
              type="password"
              placeholder={t('enter your password')}
              value={value.passwordConfirm}
              autoComplete="off"
              name="passwordConfirm"
              onChange={handleChange}
              required
            />
          </div>
          <div data-testid="errorWrapper" className={styles.errorWrapper}>
          </div>
          <button data-testid="submit" type="submit" disabled={!!value.emailError || !!value.passwordError || !!value.passwordConfirmError}>{t('start')}</button>
        </form>

        <footer>
          <a href="/signin" className={styles.footerlink}>
          <Trans>Já possui conta? <b>acesse sua conta.</b></Trans>
          </a>
        </footer>
      </div>

      <Terms />
    </>
  )
}

export default SignUp
