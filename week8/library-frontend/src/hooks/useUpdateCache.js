import { useCallback } from 'react'
import { useApolloClient } from '@apollo/client'

import { ALL_BOOKS } from '../graphql/queries'

const includedIn = (books, added) => {
  return books.map((b) => b.id).includes(added.id)
}

const useUpdateCache = () => {
  const client = useApolloClient()

  const withBook = useCallback(async (addedBook) => {
    const dataInCache = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInCache.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInCache.allBooks.concat(addedBook) }
      })
    }
  }, [client])

  return { withBook }
}

export default useUpdateCache