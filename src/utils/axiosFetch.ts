import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'

interface AxiosFetchProps {
  url: string
  options: any
  method: 'post' | 'put' | 'delete' | 'get'
}

export const axiosFetch = async ({ url, options, method }: AxiosFetchProps) => {
  return (await axiosInstance[method](BASE_URL + url, options)).data
}
