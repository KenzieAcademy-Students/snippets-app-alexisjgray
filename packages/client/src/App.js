import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { HomePage, LoginPage, PostDetailPage, UserDetailPage } from 'pages'
import { ErrorBoundary, Header } from 'components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
  return (
    <ErrorBoundary>
      <ToastContainer />
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/u/:uid' component={UserDetailPage} />
        <Route exact path='/p/:pid' component={PostDetailPage} />
        <Route
          component={({ location }) => {
            return (
              <div
                style={{
                  padding: '50px',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                The page <code>{location.pathname}</code> could not be found.
              </div>
            )
          }}
        />
      </Switch>
    </ErrorBoundary>
  )
}

export default App
