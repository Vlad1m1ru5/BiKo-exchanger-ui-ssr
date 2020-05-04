import React, { Suspense, useEffect } from 'react'
import { Route, Switch, useHistory }  from 'react-router-dom'
import { connect } from 'react-redux'

const Auth = React.lazy(() => import('client/pages/auth'))
const Feed = React.lazy(() => import('client/pages/feed'))
const Login = React.lazy(() => import('client/pages/login'))

interface Props {
  authority: string
}

const App: React.FC<Props> = ({ authority }) => {
  const history = useHistory()

  useEffect(() => {
    if (!authority) {
      history.push('/login')
      return
    }

    history.push('/feed')
  }, [authority])

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
      <Route path='/login'>
        <Suspense fallback={'Подождите...'}>
          <Login />
        </Suspense>
      </Route>
    </Switch>
  )
}

const mapStateToProps = ({ authority }: Store) => ({
  authority
})

export default connect(mapStateToProps)(App)