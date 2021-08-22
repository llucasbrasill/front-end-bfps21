
import React from 'react'
import i18next from 'i18next'
import styles from './styles.scss'

const ChangeLanguage: React.FC = () => {
  function changeLanguage (language): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    i18next.changeLanguage(language)
  }

  return (<div className={styles.wrapper}>
    <button onClick={() => changeLanguage('pt')}>PT</button>
    <button onClick={() => changeLanguage('en')}>EN</button>
  </div>)
}

export default ChangeLanguage
