import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Factory = {
  makeSignIn: React.FC
  makeSignUp: React.FC
}
const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={factory.makeSignIn} />
        <Route path="/signup" exact component={factory.makeSignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
