import React from 'react'
import Input from '../../input'
import Logo from '../../logo'
import Terms from '../../term'
import styles from '../styles.scss'

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

const SignInPassword: React.FC<Props> = ({ value, setValue, handleClick }: Props) => {
  const formRef = React.useRef(null)
  const handleSubmit = (event): void => {
    event.preventDefault()
    formRef.current.reportValidity()
    handleClick(2)
  }

  function handleChange ({ target }): void {
    setValue({ ...value, [target.id]: target.value })
  }

  return (
    <>
      <div className={`${styles.form} ${styles.password}`}>
        <header>
          <Logo />
          <h2>Olá!</h2>
          <p onClick={() => setValue({ ...value, isLogin: 0 })} className={styles.user}>
            {value.email}
          </p>
        </header>

        <form onSubmit={handleSubmit} ref={formRef}>
          <label htmlFor="password">Digite sua senha</label>
          <Input className="password" type="password" id="password" placeholder="Senha" value={value.password} onChange={handleChange} required />

          <button type="submit">Entrar</button>
          <a href="#link" className={styles.createAccount}>
            Esqueceu sua senha?
            {' '}
            <b>Recuperar senha.</b>
          </a>
        </form>

        <footer>
          <a href="#link" className={styles.recoveryPassword}>
            Preciso de ajuda para entrar
          </a>
        </footer>
      </div>
      <Terms />
    </>
  )
}

export default SignInPassword
