import Feed from 'client/pages/feed'
import Login  from 'client/pages/login'
import React, { useEffect } from 'react'
import { Route, Switch, useHistory }  from 'react-router-dom'
import { connect } from 'react-redux'

interface Props {
  path: string
}

const App: React.FC<Props> = ({ path }) => {
  const history = useHistory()

  useEffect(() => {
    history.push(path)
  }, [path])

  return (
    <Switch>
      <Route path='/'>
          <Login />
      </Route>
      <Route path='feed'>
        <Feed />
      </Route>
    </Switch>
  )
}

const mapStateToProps = ({ path }: Store) => ({
  path
})

export default connect(mapStateToProps)(App)