import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import useAuthUser from './hooks/useAuthUser'

import ModalSpinner from './components/ModalSpinner'
import Notifications from './components/Notifications'
import Menu from './components/Menu'
import Authors from './components/Authors'
import Books from './components/Books'
import RecommendedBooks from './components/RecommendedBooks'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const { hasSyncAuth } = useAuthUser()

  if (!hasSyncAuth) return <ModalSpinner />

  return (
    <Container>
      <Menu />

      <Notifications />

      <Switch>
        <Route path='/' exact>
          <Authors />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/books' exact>
          <Books />
        </Route>
        <Route path='/recommended' exact>
          <RecommendedBooks />
        </Route>
        <Route path='/newBook' exact>
          <NewBook />
        </Route>
      </Switch>
    </Container>
  )
}

export default App