import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLazyQuery, useSubscription } from '@apollo/client'
import { Row, Col, Spinner } from 'react-bootstrap'

import { ALL_BOOKS, BOOK_ADDED } from '../graphql/queries'
import useUpdateCache from '../hooks/useUpdateCache'
import useNotification from '../hooks/useNotification'

import BooksFilter from './BooksFilter'
import BooksTable from './BooksTable'
import NoBooks from './NoBooks'

const Books = () => {
  const [books, setBooks] = useState([])
  const [hasNoBooks, setHasNoBooks] = useState(false)
  const [genre, setGenre] = useState(null)

  const [getAllBooks, getAllBooksResults] = useLazyQuery(ALL_BOOKS)

  const notificationHelper = useNotification()
  const updateCache = useUpdateCache()
  const { pathname } = useLocation()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded

      updateCache.withBook(addedBook)

      if (pathname !== '/newBook') {
        notificationHelper.add('A new book has been added!', 'info')
      }
    },
  })

  useEffect(() => {
    getAllBooks() // { variables: { genre } }
  }, [genre, getAllBooks])

  useEffect(() => {
    if (!getAllBooksResults.loading) {
      const loadedBooks = getAllBooksResults.data ? getAllBooksResults.data.allBooks : []

      setHasNoBooks(loadedBooks.length === 0)
      setBooks(loadedBooks)
    }
  }, [getAllBooksResults])

  let booksToShow = books

  if (genre) {
    booksToShow = booksToShow.filter((b) => {
      return b.genres.includes(genre)
    })
  }

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
              <BooksTable books={booksToShow} />
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Books