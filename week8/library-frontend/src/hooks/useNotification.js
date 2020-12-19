import { useCallback } from 'react'

const useNotification = () => {
  const add = useCallback(
    async (message, level = '', timeout = 3000) => {
      await addNotification({ variables: { message, timeout, level } })
    }, [addNotification]
  )

  const addMultiple = useCallback(
    async (messages, level = '', timeout = 3000) => {
      for (let message of messages) {
        await addNotification({
          variables: { message, level, timeout },
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