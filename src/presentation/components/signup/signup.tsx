import React from 'react'
import Input from '../input'
import Logo from '../logo'
import Terms from '../term'
import styles from './styles.scss'
import { Link } from 'react-router-dom'

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
          <h2>Experimente por 7 dias</h2>
        </header>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit()
          }}
          ref={formRef}
        >
          <div>
            <label htmlFor="email">E-mail</label>
            <Input
              className="email"
              id="email"
              type="email"
              placeholder="Informe seu e-mail"
              value={value.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Senha</label>
            <Input
              className="password"
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={value.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Confirmar Senha</label>

            <Input
              className="passwordConfirm"
              id="passwordConfirm"
              type="password"
              placeholder="Confirmar senha"
              value={value.passwordConfirm}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Começar</button>
        </form>

        <footer>
          <Link to="/signin" className={styles.recoveryPassword}>
            Já possui conta? <b>acesse sua conta.</b>
          </Link>
        </footer>
      </div>

      <Terms />
    </>
  )
}

export default SignUp
