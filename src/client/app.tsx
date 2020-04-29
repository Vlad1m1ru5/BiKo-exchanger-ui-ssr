import React, { Suspense, useEffect } from 'react'
import { Route, Switch, useHistory }  from 'react-router-dom'
import { connect } from 'react-redux'

const Login = React.lazy(() => import('client/pages/login'))
const Feed = React.lazy(() => import('client/pages/feed'))

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
      <Route path='/feed'>
        <Suspense fallback={'Подождите...'}>
          <Feed />
        </Suspense>
      </Route>
      <Route path='/'>
        {() => {

          return (
            <Suspense fallback={'Подождите...'}>
              <Login />
            </Suspense>
          )
        }}
      </Route>
    </Switch>
  )
}

const mapStateToProps = ({ path }: Store) => ({
  path
})

export default connect(mapStateToProps)(App)