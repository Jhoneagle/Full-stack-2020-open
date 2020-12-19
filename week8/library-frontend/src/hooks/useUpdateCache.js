import { useCallback } from 'react'
import { useApolloClient } from '@apollo/client'

import { ALL_BOOKS } from '../graphql/queries'
import logger from '../utils/logger'

const includedIn = (set, object) => {
  return set.map((p) => p.id).includes(object.id)
}

const useUpdateCache = () => {
  const client = useApolloClient()

  const withBook = useCallback(
    async (addedBook) => {
      try {
        client.readQuery({ query: ALL_BOOKS })
      } catch (e) {
        logger.error(e.message)
      }

      const dataInCache = client.readQuery({ query: ALL_BOOKS })

      if (!includedIn(dataInCache.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: dataInCache.allBooks.concat(addedBook) },
        })
      }
    }, [client]
  )

  return { withBook }
}

export default useUpdateCache