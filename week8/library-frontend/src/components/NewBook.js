import React, { useRef, useState, useCallback } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { Redirect, useLocation } from 'react-router-dom'
import { useUIDSeed, uid } from 'react-uid'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, InputGroup, Button, Spinner } from 'react-bootstrap'

import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from '../graphql/queries'
import { resolveApolloErrors } from '../utils/errorHelper'
import useAuthUser from '../hooks/useAuthUser'
import useNotification from '../hooks/useNotification'

const NewBook = () => {
  const [genres, setGenres] = useState([])
  const uidSeed = useUIDSeed()
  const { user, hasSyncAuth } = useAuthUser()
  const { pathname } = useLocation()
  const notificationHelper = useNotification()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    errors,
    formState,
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      author: '',
      published: '',
      genre: '',
    }
  })

  const { touched, isSubmitting } = formState

  const [createBook, createBookResults] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS }
    ],
    onError: (error) => {
      const errorsToDisplay = resolveApolloErrors(error)
      notificationHelper.addMultiple(errorsToDisplay, 'error')
    },
  })

  const isAddingBook = useRef(false)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: () => {
      notificationHelper.add('There are new books!', 'info')
    },
  })

  const addGenre = useCallback(() => {
    const { genre } = getValues()

    if (genre) {
      setGenres((prevGenres) =>
        prevGenres.concat({ id: uid({}), value: genre })
      )

      setValue('genre', '')
    }
  }, [setValue, getValues])

  const addBook = useCallback(
    async (values) => {
      const { title, author, published } = values
      const genreValues = genres.map((g) => g.value)

      isAddingBook.current = true

      const gqlData = await createBook({
        variables: {
          title,
          author,
          published: Number(published),
          genres: genreValues
        }
      })

      if (gqlData) {
        notificationHelper.add('Succesfully created Book!', 'success')

        setTimeout(() => {
          isAddingBook.current = false
        }, 3000)
      } else {
        isAddingBook.current = false
      }

      setGenres([])
      reset()
    }, [genres, createBook, reset, notificationHelper]
  )

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

  return (
    <>
      <Form onSubmit={handleSubmit(addBook)} className='my-4'>
        <h1 className='d-inline h2 mb-3 mr-2'>Add a new Book</h1>
        {createBookResults.loading && (
          <Spinner variant='success' animation='grow' role='status' size='sm'>
            <span className='sr-only'>Creating Book...</span>
          </Spinner>
        )}

        <hr />

        <Form.Group as={Form.Row} controlId={uidSeed('title')}>
          <Form.Label column sm={2} md={1} className='font-weight-bold'>
            Title
          </Form.Label>
          <Col sm={10} md={6}>
            <Form.Control
              ref={register({
                required: 'Please enter title',
              })}
              type='text'
              name='title'
              placeholder='Book Title'
              isValid={touched.title && !errors.title}
              isInvalid={errors.title}
            />

            <Form.Control.Feedback type='invalid'>
              {errors.title && errors.title.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Form.Row} controlId={uidSeed('author')}>
          <Form.Label column sm={2} md={1} className='font-weight-bold'>
            Author
          </Form.Label>
          <Col sm={10} md={6}>
            <Form.Control
              ref={register({
                required: 'Please enter author',
              })}
              type='text'
              name='author'
              placeholder='Book Author'
              isValid={touched.author && !errors.author}
              isInvalid={errors.author}
            />

            <Form.Control.Feedback type='invalid'>
              {errors.author && errors.author.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Form.Row} controlId={uidSeed('published')}>
          <Form.Label column sm={2} md={1} className='font-weight-bold'>
            Published
          </Form.Label>
          <Col sm={10} md={6}>
            <Form.Control
              ref={register({
                required: 'Please enter publication year',
              })}
              type='number'
              name='published'
              placeholder='Publication Year'
              isValid={touched.published && !errors.published}
              isInvalid={errors.published}
            />

            <Form.Control.Feedback type='invalid'>
              {errors.published && errors.published.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Form.Row} controlId={uidSeed('genre')}>
          <Form.Label column sm={2} md={1} className='font-weight-bold'>
            Genres
          </Form.Label>
          <Col sm={10} md={6}>
            <InputGroup>
              <Form.Control
                ref={register}
                type='text'
                name='genre'
                placeholder='Book Genre'
                aria-label='Add a Genre for the Book'
                aria-describedby={uidSeed('genre')}
              />

              <InputGroup.Append>
                <Button type='button' variant='primary' onClick={addGenre}>
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <Form.Text className='text-muted'>
              Enter a genre and click the button to add to the list of genres
            </Form.Text>

            <div>
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  className='d-inline-block border px-3 py-2 mr-2 mb-2'
                >
                  <span>{genre.value}</span>
                </div>
              ))}
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ offset: 2 }} md={{ offset: 1, span: 6 }}>
            <Button
              variant='success'
              type='submit'
              size='lg'
              block
              disabled={isSubmitting}
            >
              Create Book
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  )
}

export default NewBook