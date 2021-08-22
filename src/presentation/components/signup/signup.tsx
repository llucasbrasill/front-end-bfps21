import React from 'react'
import Input from '../input'
import Logo from '../logo'
import Terms from '../term'
import styles from './styles.scss'
import { Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

interface login {
  email: string
  password: string
  passwordConfirm: string
  isLogin: number
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
      <div className={styles.form}>
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
              className="email"
              id="email"
              type="email"
              placeholder={t('enter your email')}
              value={value.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="email">{t('password')}</label>
            <Input
              className="password"
              id="password"
              type="password"
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
              className="passwordConfirm"
              id="passwordConfirm"
              type="password"
              placeholder={t('enter your password')}
              value={value.passwordConfirm}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">{t('start')}</button>
        </form>

        <footer>
          <Link to="/signin" className={styles.footerlink}>
          <Trans>Já possui conta? <b>acesse sua conta.</b></Trans>
          </Link>
        </footer>
      </div>

      <Terms />
    </>
  )
}

export default SignUp
