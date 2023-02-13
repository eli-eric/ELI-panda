import axios from 'axios'

export async function fetcher(url) {
  const res = await axios.get(url).then(res => res.data)
  return res
}
