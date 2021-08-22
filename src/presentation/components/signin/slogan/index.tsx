import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../styles.scss'

type Props = {
  children?: | JSX.Element
  | JSX.Element[]
  | string
  | string[]
  id?: string
}

const Slogan: React.FC<Props> = ({ children, id }: Props) => {
  const { t } = useTranslation()
  return (<>

        <div className={styles.slogan} dangerouslySetInnerHTML={{ __html: t('slogan') }}>

        </div>
  </>)
}

export default Slogan
