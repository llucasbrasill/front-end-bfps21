
import React from 'react'
import i18next from 'i18next'
import styles from './styles.scss'

const ChangeLanguage: React.FC = () => {
  function changeLanguage ({ value }): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    i18next.changeLanguage(value)
  }

  return (<div className={styles.wrapper}>
    <select onChange={({ target }) => changeLanguage(target)}>
        <option value="pt">Português</option>
        <option value="en">English</option>
    </select>
  </div>)
}

export default ChangeLanguage
