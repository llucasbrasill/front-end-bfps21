import React from 'react'
import ChangeLanguage from '../translations/changeLanguage'

import styles from './styles.scss'

const Terms: React.FC = () => {
  return (<>
  <div className={styles.terms}>
    <p>Protegido por reCAPTCHA - Privacidade - Condições</p>
    <p><b>Privacidade & Termos</b> e <b>Termos de Serviço</b> se aplicam.</p>
    <ChangeLanguage />
  </div>

  </>)
}

export default React.memo(Terms)
