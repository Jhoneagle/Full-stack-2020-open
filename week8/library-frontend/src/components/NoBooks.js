import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NoResource from './NoResource'

import useAuthUser from '../hooks/useAuthUser'

const NoBooks = () => {
  const { user, hasSyncAuth } = useAuthUser()

  if (!hasSyncAuth) {
    return null
  }

  return (
    <>
      <NoResource resource='books' />
      <p>
        {user && (
          <Button variant='primary' as={Link} to='/new'>
            Add a new Book
          </Button>
        )}
        {!user && (
          <Button
            variant='primary'
            as={Link}
            to={{
              pathname: '/login',
              state: { from: '/new' },
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