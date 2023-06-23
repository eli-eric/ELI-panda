import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

function useManagedQuery(initialQuery) {
  const router = useRouter()
  const [managedQuery, setManagedQuery] = useState(router.query)
  const [ready, setReady] = useState(false)

  const setQuery = useCallback(
    newQuery => {
      setManagedQuery(oldQuery => ({ ...oldQuery, ...newQuery }))
    },
    [setManagedQuery]
  )

  useEffect(() => {
    setManagedQuery(oldQuery => ({ ...oldQuery, ...initialQuery }))
  }, [initialQuery])

  useEffect(() => {
    router
      .replace(
        {
          pathname: router.pathname,
          query: managedQuery
        },
        undefined,
        { scroll: false }
      )
      .then(() => setReady(true))
  }, [router, managedQuery])

  return [managedQuery, setQuery, ready]
}

export default useManagedQuery
