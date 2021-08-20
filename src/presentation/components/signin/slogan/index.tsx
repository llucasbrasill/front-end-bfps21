import React from 'react'
import styles from '../styles.scss'

type Props = {
  children?: | JSX.Element
  | JSX.Element[]
  | string
  | string[]
  id?: string
}

const Slogan: React.FC<Props> = ({ children, id }: Props) => {
  return (<>
        <div className={styles.slogan} dangerouslySetInnerHTML={{ __html: process.env.APP_SLOGAN }}></div>
  </>)
}

export default Slogan
