import React, { useCallback } from 'react'
import { useUIDSeed } from 'react-uid'
import Select from 'react-select'
import { Row, Col } from 'react-bootstrap'

import useBookGenres from '../hooks/useBookGenres'

const BooksFilter = (props) => {
  const { genres, hasGenres } = useBookGenres()
  const uidSeed = useUIDSeed()

  const generateOptions = useCallback(() => {
    const defaultOption = [{ value: 0, label: 'all' }]

    let options = defaultOption

    if (hasGenres) {
      const genreOptions = genres.map((g, idx) => {
        return { value: idx + 1, label: g }
      })

      options = defaultOption.concat(genreOptions)
    }

    return options
  }, [genres, hasGenres])

  const filterByGenre = useCallback((option) => {
    const genre = option.label === 'all' ? null : option.label

    props.setGenre(genre)
  }, [])

  return (
    <>
      <Row className='mb-4 align-items-center'>
        <Col xs={12} className='mb-2'>
          <span id={uidSeed('genre-filter')} className='lead'>
            Filter Books by Genre:
          </span>
        </Col>
        <Col sm={10} md={5}>
          <Select
            name='genres'
            options={generateOptions()}
            onChange={filterByGenre}
            defaultValue={generateOptions()[0]}
            aria-labelledby={uidSeed('genre-filter')}
            isLoading={props.getAllBooks.loading}
          />
        </Col>
      </Row>
    </>
  )
}

export default BooksFilter