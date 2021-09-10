
import React from 'react'
import i18next from 'i18next'
import styles from './styles.scss'

const Translations: React.FC = () => {
  return (<div className={styles.wrapper}>
    <select onChange={async ({ target }) => await i18next.changeLanguage(target.value) } data-testid="translations-select" defaultValue={i18next.language}>
        <option value="pt">Português</option>
        <option value="en">English</option>
    </select>
  </div>)
}

export default Translations
