import React, { useCallback } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { useUIDSeed } from 'react-uid'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'

import useAuthUser from '../hooks/useAuthUser'

const Menu = () => {
  const uidSeed = useUIDSeed()
  const { pathname } = useLocation()
  const history = useHistory()
  const client = useApolloClient()
  const { user, hasSyncAuth } = useAuthUser()

  const logout = useCallback(() => {
    localStorage.removeItem('gqlLibrary-user-token')
    history.push('/login')
    client.resetStore()
  }, [client, history])

  return (
    <Navbar collapseOnSelect variant='dark' bg='dark' expand='lg' sticky='top'>
      <Container fluid>
        <Navbar.Brand>GraphQL Library</Navbar.Brand>
        <Navbar.Toggle aria-controls={uidSeed('navbar-collapse')} />
        <Navbar.Collapse id={uidSeed('navbar-collapse')}>
          <Nav className='mr-auto'>
            <Nav.Link
              to='/'
              as={Link}
              active={pathname === '/'}
              className='mr-2'
            >
              Authors
            </Nav.Link>
            <Nav.Link
              to='/books'
              as={Link}
              active={pathname === '/books'}
              className='mr-2'
            >
              Books
            </Nav.Link>
            {user && (
              <>
                <Nav.Link
                  to='/newBook'
                  as={Link}
                  active={pathname === '/newBook'}
                  className='mr-2'
                >
                  Add Book
                </Nav.Link>
                <Nav.Link
                  to='/recommended'
                  as={Link}
                  active={pathname === '/recommended'}
                  className='mr-2'
                >
                  Recommended
                </Nav.Link>
              </>
            )}
          </Nav>
          <>
            {hasSyncAuth && user && (
              <Nav>
                <Nav.Item>
                  <Navbar.Text className='font-weight-bold'>
                    Signed in as {user.username}
                  </Navbar.Text>
                  <Button
                    variant='light'
                    size='sm'
                    className='ml-3'
                    onClick={logout}
                  >
                    <span className='text-uppercase font-weight-bold'>
                      Logout
                    </span>
                  </Button>
                </Nav.Item>
              </Nav>
            )}
            {hasSyncAuth && !user && (
              <Nav>
                <Nav.Item>
                  <Button
                    as={Link}
                    size='sm'
                    variant='light'
                    to={{
                      pathname: '/login',
                      state: { from: pathname },
                    }}
                  >
                    <span className='text-uppercase font-weight-bold'>
                      Login
                    </span>
                  </Button>
                </Nav.Item>
              </Nav>
            )}
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu