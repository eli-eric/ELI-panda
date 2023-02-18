import axios from 'axios'

import { BASE_URL } from '@/types/constants/common'

export async function fetcher(url) {
  const res = await axios.get(BASE_URL + url).then(res => res.data)
  return res
}
