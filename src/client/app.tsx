import React, { Suspense, useEffect } from 'react'
import { Route, Switch, useHistory }  from 'react-router-dom'
import { connect } from 'react-redux'

const Auth = React.lazy(() => import('client/pages/auth'))
const Feed = React.lazy(() => import('client/pages/feed'))
const Finder = React.lazy(() => import('client/pages/finder'))
const Login = React.lazy(() => import('client/pages/login'))
const Settings = React.lazy(() => import('client/pages/settings'))

interface Props {
  token: string
}

const App: React.FC<Props> = ({ token }) => {
  const history = useHistory()

  useEffect(() => {
    if (!token) {
      history.push('/login')
      return
    }

    history.push('/feed')
  }, [token])

  return (
    <Switch>
      <Route path='/auth'>
        <Suspense fallback={'Подождите...'}>
          <Auth />
        </Suspense>
      </Route>
      <Route path='/feed'>
        <Suspense fallback={'Подождите...'}>
          <Feed />
        </Suspense>
      </Route>
      <Route path='/finder'>
        <Suspense fallback={'Подождите...'}>
          <Finder />
        </Suspense>
      </Route>
      <Route path='/login'>
        <Suspense fallback={'Подождите...'}>
          <Login />
        </Suspense>
      </Route>
      <Route path='/settings'>
        <Suspense fallback={'Подождите...'}>
          <Settings />
        </Suspense>
      </Route>
    </Switch>
  )
}

const mapStateToProps = ({ token }: Store) => ({
  token
})

export default connect(mapStateToProps)(App)