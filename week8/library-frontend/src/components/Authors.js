import React, { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { Row, Col, Spinner } from 'react-bootstrap'

import { ALL_AUTHORS, BOOK_ADDED } from '../graphql/queries'

import AuthorsTable from './AuthorsTable'
import AuthorsForm from './AuthorsForm'
import NoResource from './NoResource'

const Authors = () => {
  const [authors, setAuthors] = useState([])
  const [hasNoAuthors, setHasNoAuthors] = useState(false)
  const getAllAuthors = useQuery(ALL_AUTHORS)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: () => {
      getAllAuthors.refetch()
    },
  })

  useEffect(() => {
    const { called, networkStatus, data } = getAllAuthors

    if (called && networkStatus > 6) {
      const newAuthors = data ? data.allAuthors : authors

      setHasNoAuthors(newAuthors.length === 0)
      setAuthors(newAuthors)
    }
  }, [authors, getAllAuthors])

  return (
    <>
      <Row className='my-4'>
        <Col>
          <h1 className='d-inline h2 mr-2'>Authors</h1>

          {getAllAuthors.loading && (
            <Spinner variant='info' animation='grow' role='status' size='sm'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          )}

          <hr />

          <AuthorsForm authors={authors} />

          {hasNoAuthors && <NoResource resource='authors' />}

          {authors.length > 0 && (
            <>
              <AuthorsTable authors={authors} />
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Authors
