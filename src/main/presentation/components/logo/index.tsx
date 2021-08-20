import React from 'react'

const Logo: React.FC = () => {
  return (<>
        <h1>{process.env.APP_NAME}</h1>
  </>)
}

export default React.memo(Logo)
