import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Redirect, useLocation } from 'react-router-dom'
import { Row, Col, Spinner } from 'react-bootstrap'

import { ALL_BOOKS } from '../graphql/queries'
import useAuthUser from '../hooks/useAuthUser'
import BooksTable from './BooksTable'
import NoResource from './NoResource'

const RecommendedBooks = () => {
  const [books, setBooks] = useState([])
  const [hasNoBooks, setHasNoBooks] = useState(false)
  const getAllBooks = useQuery(ALL_BOOKS)
  const { user, hasSyncAuth } = useAuthUser()
  const { pathname } = useLocation()

  useEffect(() => {
    const { called, networkStatus, data } = getAllBooks

    if (called && networkStatus > 6) {
      const newBooks = data ? data.allBooks : books

      setHasNoBooks(books.length === 0)
      setBooks(newBooks)
    }
  }, [books, getAllBooks])

  if (!hasSyncAuth) {
    return null
  }

  if (hasSyncAuth && !user) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: pathname },
        }}
      />
    )
  }

  const booksToShow = books.filter((b) => {
    b.genres.includes(user.favoriteGenre)
  })

  return (
    <>
      <Row className='my-4'>
        <Col>
          <h1 className='d-inline h2 mr-2'>Recommended Books</h1>

          {getAllBooks.loading && (
            <Spinner animation='grow' variant='info' role='status' size='sm'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          )}

          <hr />

          {hasNoBooks && <NoResource resource='books' />}

          <p className='lead'>
            In your favorite genre:

            <span className='font-weight-bold ml-2'>
              {user.favoriteGenre}
            </span>
          </p>

          {booksToShow.length > 0 && <BooksTable books={booksToShow} />}
        </Col>
      </Row>
    </>
  )
}

export default RecommendedBooks