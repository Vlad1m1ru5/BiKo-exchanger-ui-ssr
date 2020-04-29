import React, { Suspense, useEffect } from 'react'
import { Route, Switch, useHistory }  from 'react-router-dom'
import { connect } from 'react-redux'

const Login = React.lazy(() => import('client/pages/login'))
const Feed = React.lazy(() => import('client/pages/feed'))

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
      {authority && (
        <Route path='/'>
          <Suspense fallback={'Подождите...'}>
            <div>Hi!</div>
          </Suspense>
        </Route>
      )}
    </Switch>
  )
}

const mapStateToProps = ({ authority }: Store) => ({
  authority
})

export default connect(mapStateToProps)(App)