import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../graphql/queries'
import logger from '../utils/logger'

const useNotification = () => {
  const [addNotification] = useMutation(ADD_NOTIFICATION, {
    onError: (error) => logger.error(error.message)
  })

  const [removeNotification] = useMutation(REMOVE_NOTIFICATION, {
    onError: (error) => logger.error(error.message)
  })

  const add = useCallback(
    async (message, level = '', timeout = 3000) => {
      await addNotification({ variables: { message, timeout, level } })
    }, [addNotification]
  )

  const addMultiple = useCallback(
    async (messages, level = '', timeout = 3000) => {
      for (let message of messages) {
        await addNotification({
          variables: { message, timeout, level },
        })
      }
    }, [addNotification]
  )

  const remove = useCallback(
    async (id) => {
      await removeNotification({ variables: { id } })
    }, [removeNotification]
  )

  return { add, addMultiple, remove }
}

export default useNotification