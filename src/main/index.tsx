import React from 'react'
import ReactDOM from 'react-dom'
import '@/presentation/styles/main.scss'
import { Router } from '@/presentation/components'
import './config/i18n/config'
import { makeLogin } from './factories/pages/login/login-factory'

ReactDOM.render(
    <Router
        makeLogin={makeLogin}
    />,
    document.getElementById('app')
)
