import axios from 'axios'

import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'

export async function fetcher(url) {
  const res = await axiosInstance.get(BASE_URL + url).then(res => res.data)
  return res
}

export async function mockFetcher(url) {
  const res = await axiosInstance.get('http://localhost:5001/api/mock-server' + url).then(res => res.data)
  return res
}

export const uniFetcher = async url => await axios.get(url).then(res => res.data)
