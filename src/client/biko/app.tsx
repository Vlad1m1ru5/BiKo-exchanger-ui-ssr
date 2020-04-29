import React from 'react'
import { Route, Switch }  from 'react-router-dom'
import Login  from 'client/pages/login'

const App: React.FC = () => {

  return (
    <Switch>
      <Route path='/'>
          <Login />
      </Route>
    </Switch>
  )
}

export default App