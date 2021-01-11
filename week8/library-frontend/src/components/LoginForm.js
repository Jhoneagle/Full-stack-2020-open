import React, { useState, useCallback, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap'

import { useUIDSeed } from 'react-uid'
import { LOGIN, ME } from '../graphql/queries'
import { resolveApolloErrors } from '../utils/errorHelper'
import useNotification from '../hooks/useNotification'

const LoginForm = () => {
  const [redirectPath, setRedirectPath] = useState('/')
  const { state } = useLocation()
  const history = useHistory()
  const notificationHelper = useNotification()

  useEffect(() => {
    if (state && state.from) {
      setRedirectPath(state.from)
    }
  }, [state])

  const [login] = useMutation(LOGIN, {
    refetchQueries: ({ data: { login } }) => {
      localStorage.setItem('gqlLibrary-user-token', login.value)

      return [{ query: ME }]
    },
    onError: (error) => {
      const errorsToDisplay = resolveApolloErrors(error)
      notificationHelper.addMultiple(errorsToDisplay, 'error')
    },
    awaitRefetchQueries: true,
  })

  const uidSeed = useUIDSeed()
  const { register, errors, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { isSubmitting } = formState

  const loginUser = useCallback(
    async (values) => {
      const variables = {
        username: values.username,
        password: values.password,
      }

      const gqlData = await login({ variables })

      reset()

      if (gqlData) {
        history.push(redirectPath)

        notificationHelper.add('Successfully logged in!', 'success')
      }
    },
    [login, notificationHelper, reset, redirectPath, history]
  )

  return (
    <Form onSubmit={handleSubmit(loginUser)}>
      <Form.Group as={Row} controlId={uidSeed('username')}>
        <Col>
          <Form.Control
            type='text'
            ref={register({
              required: 'Please enter username',
            })}
            name='username'
            placeholder='Enter Username'
            isInvalid={errors.username}
          />

          <Form.Control.Feedback type='invalid'>
            {errors.username && errors.username.message}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId={uidSeed('password')}>
        <Col>
          <Form.Control
            type='password'
            ref={register({
              required: 'Please enter password',
            })}
            name='password'
            placeholder='Enter Password'
            isInvalid={errors.password}
          />

          <Form.Control.Feedback type='invalid'>
            {errors.password && errors.password.message}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col>
          <Button type='submit' size='lg' disabled={isSubmitting} block>
            <>
              {!isSubmitting && <span className='text-uppercase'>Login</span>}
              {isSubmitting && (
                <Spinner animation='border' role='status'>
                  <span className='sr-only'>Logging in...</span>
                </Spinner>
              )}
            </>
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default LoginForm