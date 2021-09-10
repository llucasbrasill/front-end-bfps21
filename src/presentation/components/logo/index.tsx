import React from 'react'

const Logo: React.FC = () => (<h1>{process.env.APP_NAME}</h1>)

export default React.memo(Logo)
