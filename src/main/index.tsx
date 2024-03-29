import React from 'react'
import ReactDOM from 'react-dom'
import '@/presentation/styles/main.scss'
import { Router } from '@/presentation/components'
import './config/i18n/config'
import { makeSignIn } from './factories/pages/signin/signin-factory'
import { makeSignUp } from './factories/pages/signup/signup-factory'

ReactDOM.render(
    <Router
        makeSignIn={makeSignIn}
        makeSignUp={makeSignUp}
    />,
    document.getElementById('app')
)
