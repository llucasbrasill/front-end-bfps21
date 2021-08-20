import React from 'react'

import styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (<>
        <div className={styles.wrapper}>
            <input {...props} ref={props.ref}/>
        </div>
  </>)
}

export default Input
