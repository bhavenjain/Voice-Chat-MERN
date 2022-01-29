import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh'
import Navigation from './Components/Shared/Navigation/Navigation'
import Authenticate from './pages/Authenticate/Authenticate'
import Activate from './pages/Activate/Activate'
import Rooms from './pages/Rooms/Rooms'
import Home from './pages/Home/Home'
import { useSelector } from 'react-redux'
import Loader from './Components/Shared/Loader/Loader'
import './App.css'
import Room from './pages/Room/Room'

function App () {
  const { loading } = useLoadingWithRefresh()

  return loading ? (
    <Loader message='Loading, please wait...!' />
  ) : (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <GuestRoute path='/' exact>
          <Home />
        </GuestRoute>
        <GuestRoute path='/authenticate'>
          <Authenticate />
        </GuestRoute>

        <SemiProtectedRoute path='/activate'>
          <Activate />
        </SemiProtectedRoute>

        <ProtectedRoute path='/rooms'>
          <Rooms />
        </ProtectedRoute>

        <ProtectedRoute path='/room/:id'>
          <Room />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  )
}

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector(state => state.auth)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        ) : isAuth && !user.activated ? (
          <Redirect to={{ pathname: '/activate', state: { from: location } }} />
        ) : (
          children
        )
      }}
    ></Route>
  )
}

const SemiProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        ) : isAuth && !user.activated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/rooms', state: { from: location } }} />
        )
      }}
    ></Route>
  )
}

const GuestRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector(state => state.auth)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect to={{ pathname: '/rooms', state: { from: location } }} />
        ) : (
          children
        )
      }}
    ></Route>
  )
}

export default App
