import React from 'react'

import styles from './styles.scss'

const Terms: React.FC = () => {
  return (<>
  <div className={styles.terms}>
    <p>Protegido por reCAPTCHA - Privacidade - Condições</p>
    <p><b>Privacidade & Termos</b> e <b>Termos de Serviço</b> se aplicam.</p>
  </div>
  </>)
}

export default React.memo(Terms)
