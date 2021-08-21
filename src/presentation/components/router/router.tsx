import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SignIn } from '@/presentation/pages/'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={SignIn} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
