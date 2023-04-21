import { useMemo } from 'react'

const useQueryString = (queryObject: object) => {
  const queryString = useMemo(() => JSON.stringify(queryObject), [queryObject])
  return queryString
}

export default useQueryString
