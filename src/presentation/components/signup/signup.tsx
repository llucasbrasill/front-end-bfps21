import React from 'react'
import Input from '../input'
import Logo from '../logo'
import Terms from '../term'
import styles from './styles.scss'
import { useTranslation, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'
import SubmitButton from '../submitButton'

interface login {
  name: string
  email: string
  password: string
  passwordConfirm: string
  isLogin: number
  nameError: string
  emailError: string
  passwordError: string
  passwordConfirmError: string
  isLoading: boolean
  mainError: string
  isFormInvalid: boolean
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
          data-testid="form"
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit()
          }}
          ref={formRef}
        >
          <div>
            <label htmlFor="name">{t('name')}</label>
            <Input
              className={`name ${value.name && (value.nameError ? styles.invalid : styles.valid)}`}
              id="name"
              type="text"
              name="name"
              placeholder={t('enter your name')}
              value={value.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <div className={styles.errorWrapper}>
                  <span>{value.name && value.nameError}</span>
            </div>
          </div>
          <div>
            <label htmlFor="email">{t('email')}</label>
            <Input
              className={`email ${value.email && (value.emailError ? styles.invalid : styles.valid)}`}
              id="email"
              type="email"
              name="email"
              placeholder={t('enter your email')}
              value={value.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <div className={styles.errorWrapper}>
                  <span>{value.email && value.emailError}</span>
            </div>
          </div>

          <div>
            <label htmlFor="password">{t('password')}</label>
            <Input
              className={`password ${value.password && (value.passwordError ? styles.invalid : styles.valid)}`}
              id="password"
              type="password"
              name="password"
              placeholder={t('enter your password')}
              value={value.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />

            <div className={styles.errorWrapper}>
                  <span>{value.password && value.passwordError}</span>
            </div>
          </div>

          <div>
            <label htmlFor="passwordConfirm">{t('passwordConfirm')}</label>

            <Input

              className={`passwordConfirm ${value.passwordConfirm && (value.passwordConfirmError ? styles.invalid : styles.valid)}`}
              id="passwordConfirm"
              type="password"
              placeholder={t('enter your password')}
              value={value.passwordConfirm}
              autoComplete="off"
              name="passwordConfirm"
              onChange={handleChange}
              required
            />

            <div className={styles.errorWrapper}>
                  <span>{value.passwordConfirm && value.passwordConfirmError}</span>
            </div>
          </div>
          <div data-testid="errorWrapper" className={styles.errorWrapper}>
            { value.mainError && <span data-testid="mainError">{value.mainError}</span> }
          </div>
          <SubmitButton name={t('start')} testId="submit" disabled={value.isFormInvalid} />
        </form>

        <footer>
          <Link replace to="/signin" data-testid="loginLink" className={styles.footerlink}>
          <Trans>Já possui conta? <b>acesse sua conta.</b></Trans>
          </Link>
        </footer>
      </div>

      <Terms />
    </>
  )
}

export default SignUp
