import { useRouter } from 'next/router'

function useParam(name: string) {
  const router = useRouter()
  const { query, push } = router

  const param = query[name] || ''

  const setParam = (value: string): void => {
    push({ query: { ...query, [name]: value } }, undefined, { shallow: true })
  }

  return [param, setParam]
}

export default useParam
