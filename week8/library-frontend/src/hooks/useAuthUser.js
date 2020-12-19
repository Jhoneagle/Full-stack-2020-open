import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ME } from '../graphql/queries'

const useAuthUser = () => {
  const [authStatus, setAuthStatus] = useState({
    user: null,
    hasSyncAuth: false,
  })

  const getAuthUser = useQuery(ME)

  useEffect(() => {
    const { called, networkStatus, data } = getAuthUser

    if (called && networkStatus > 6) {
      const authUser = data ? data.me : null

      setAuthStatus({ user: authUser, hasSyncAuth: true })
    }
  }, [getAuthUser])

  return authStatus
}

export default useAuthUser