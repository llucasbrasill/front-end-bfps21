import React from 'react'
import ReactDOM from 'react-dom'
import '@/presentation/assets/sass/app.scss'
import { Router } from '@/presentation/components'
import './config/i18n/config'

ReactDOM.render(
    <Router />,
    document.getElementById('app')
)
