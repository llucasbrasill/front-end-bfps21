import React from 'react'
import styles from './styles.scss'

type Props = {
  children?: JSX.Element | JSX.Element[] | string | string[]
  aside: any
  id?: string
}

const LoginLayout: React.FC<Props> = ({ children, id, aside }: Props) => {
  return (
    <>
      <section id={id} className={styles.wrapper}>
        <div className={`${styles.content}  ${styles.column}`}>
          {children}
        </div>
        <div className={`${styles.aside} ${styles.column}`}>{aside}</div>
      </section>
    </>
  )
}

export default LoginLayout
