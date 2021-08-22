import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SignIn, SignUp } from '@/presentation/pages/'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
