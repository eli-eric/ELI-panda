import { useRouter } from 'next/router'

function useParam(name: string): [string, (value: string) => void] {
  const router = useRouter()
  const { query, push } = router

  const param = query[name] || ''

  const setParam = (value: string) => {
    push({ query: { ...query, [name]: value } }, undefined, { shallow: true })
  }

  return [param as string, setParam]
}

export default useParam
