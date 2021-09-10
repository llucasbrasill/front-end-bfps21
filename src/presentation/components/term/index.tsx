import React from 'react'
import Translations from '../translations'

import styles from './styles.scss'

const Term: React.FC = () => {
  return (<>
  <div className={styles.terms}>
    <p>Protegido por reCAPTCHA - Privacidade - Condições</p>
    <p><b>Privacidade & Termos</b> e <b>Termos de Serviço</b> se aplicam.</p>
    <Translations />
  </div>

  </>)
}

export default React.memo(Term)
