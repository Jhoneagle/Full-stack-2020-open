import React, { useState, useEffect } from 'react'
import { useLazyQuery, useSubscription } from '@apollo/client'
import { Row, Col, Spinner } from 'react-bootstrap'

import { ALL_BOOKS, BOOK_ADDED } from '../graphql/queries'
import BooksFilter from './BooksFilter'
import BooksTable from './BooksTable'
import NoBooks from './NoBooks'

const Books = () => {
  const [books, setBooks] = useState([])
  const [hasNoBooks, setHasNoBooks] = useState(false)
  const [genre, setGenre] = useState(null)
  const [getAllBooks, getAllBooksResults] = useLazyQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: () => {
      getAllBooks()
    },
  })

  useEffect(() => {
    getAllBooks({ variables: { genre } })
  }, [genre, getAllBooks])

  useEffect(() => {
    const { called, data, networkStatus } = getAllBooksResults

    if (called && networkStatus > 6) {
      const books = data ? data.allBooks : []

      setHasNoBooks(books.length === 0)
      setBooks(books)
    }
  }, [getAllBooksResults])

  return (
    <>
      <Row className='my-4'>
        <Col>
          <h1 className='d-inline h2 mr-2'>Books</h1>

          {getAllBooksResults.loading && (
            <Spinner animation='grow' variant='info' role='status' size='sm'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          )}

          <hr />

          {hasNoBooks && <NoBooks />}

          {books.length > 0 && (
            <>
              <BooksFilter
                setGenre={setGenre}
                getAllBooks={getAllBooksResults}
              />
              <BooksTable books={books} />
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Books