import React from 'react'

type Props = {
  name: string
  disabled: boolean
  testId: string
}

const submitButton: React.FC<Props> = ({ name, disabled, testId }: Props) => {
  return (<>
    <button data-testid={testId} type="submit" disabled={disabled}>{name}</button>
  </>)
}

export default submitButton
