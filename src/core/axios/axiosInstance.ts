import axios from 'axios'
import { getSession } from 'next-auth/react'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(async config => {
  const session = await getSession()
  if (session?.user) {
    config.headers['authorization'] = `Bearer ${session.user.apiAccessToken}`
  }
  return config
})

export default axiosInstance
