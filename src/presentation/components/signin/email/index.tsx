import React from 'react'
import Input from '../../input'
import Logo from '../../logo'
import Terms from '../../term'
import styles from '../styles.scss'
import { Link } from 'react-router-dom'

interface login {
  email: string
  password: string
  remember: boolean
  isLogin: number
}

type Props = {
  value: login
  setValue: Function
  handleClick: Function
}

const SignIn: React.FC<Props> = ({ value, setValue, handleClick }: Props) => {
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
          <h2>Acesse sua conta</h2>
        </header>

        <form onSubmit={(event) => { event.preventDefault(); handleSubmit() }} ref={formRef}>
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
          <button type="submit">Continuar</button>

          <Link to="/signup" className={styles.createAccount}>
            Não tem conta? <b>Teste grátis por 7 dias.</b>
          </Link>
        </form>

        <footer>
          <Link to="/" className={styles.recoveryPassword}>
            Preciso de ajuda para entrar
          </Link>
        </footer>
      </div>

      <Terms />
    </>
  )
}

export default SignIn
