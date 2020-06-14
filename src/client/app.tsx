import Cookies from 'universal-cookie'
import React, { Suspense, useEffect } from 'react'
import { Route, Switch, useHistory }  from 'react-router-dom'
import { connect } from 'react-redux'
import { setUserName, setUserPassword } from 'store/actions'

const Auth = React.lazy(() => import('client/pages/auth'))
const Feed = React.lazy(() => import('client/pages/feed'))
const Finder = React.lazy(() => import('client/pages/finder'))
const Login = React.lazy(() => import('client/pages/login'))
const Settings = React.lazy(() => import('client/pages/settings'))

interface Props {
  setUserName: action
  setUserPassword: action
  token: string
  userName: string
  userPassword: string
}

const cookies = new Cookies()

const App: React.FC<Props> = ({
  setUserName,
  setUserPassword,
  token,
  userName,
  userPassword
}) => {
  const history = useHistory()

  useEffect(() => {
    if (userName &&
        userPassword
    ) {
      cookies.set('username', userName)
      cookies.set('password', userPassword)
    } else {
      const username = cookies.get('username')
      const password = cookies.get('password')

      if (username &&
          password  
      ) {
        setUserName(username)
        setUserPassword(password)
      }
    }

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

const mapStateToProps = ({ token, userName, userPassword }: Store) => ({
  token,
  userName,
  userPassword
})

const mpaDispatchToProps = {
  setUserName,
  setUserPassword
}

export default connect(mapStateToProps, mpaDispatchToProps)(App)