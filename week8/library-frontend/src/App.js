import React from 'react'
import { useSubscription } from '@apollo/client'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import useUpdateCache from './hooks/useUpdateCache'
import useAuthUser from './hooks/useAuthUser'
import useNotification from './hooks/useNotification'

import { BOOK_ADDED } from './graphql/queries'

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
  const notificationHelper = useNotification()
  const updateCache = useUpdateCache()
  const { pathname } = useLocation()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded

      updateCache.withBook(addedBook)

      if (pathname !== '/new') {
        notificationHelper.add('A new book has been added', 'info')
      }
    },
  })

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
        <Route path='/new' exact>
          <NewBook />
        </Route>
      </Switch>
    </Container>
  )
}

export default App