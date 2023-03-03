import { useMemo } from 'react'

const useQueryString = (queryObject: object) => {
  const query = useMemo(() => JSON.stringify(queryObject), [queryObject])
  return query
}

export default useQueryString
