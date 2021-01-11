import React from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import useAuthUser from '../hooks/useAuthUser'

const NoBooks = () => {
  const { user, hasSyncAuth } = useAuthUser()

  if (!hasSyncAuth) {
    return null
  }

  return (
    <>
      <Jumbotron>
        <p className='lead'>There are currently no books to display.</p>
      </Jumbotron>
      <p>
        {user && (
          <Button variant='primary' as={Link} to='/newBook'>
            Add a new Book
          </Button>
        )}
        {!user && (
          <Button
            variant='primary'
            as={Link}
            to={{
              pathname: '/login',
              state: { from: '/newBook' },
            }}
          >
            Login to add a new Book
          </Button>
        )}
      </p>
    </>
  )
}

export default NoBooks