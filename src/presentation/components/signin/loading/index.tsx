import React from 'react'
import Logo from '../../logo'
import Terms from '../../term'
import styles from '../styles.scss'

const Loading: React.FC = () => {
  return (
    <>
      <div className={styles.form} data-testid="loading">
        <header>
          <Logo />
        </header>

        <div className={styles.loading}>
          <p>Autenticando...</p>
        </div>

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

export default Loading
