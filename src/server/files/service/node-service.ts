import fetch from 'node-fetch'

import { BASE_URL } from '@/types/constants/common'

export const saveUrlsToNode = async (
  uid: string,
  urls: string[],
  token: any,
  nodeLabel: string
) => {
  const response = await fetch(
    `${BASE_URL}/files/node/${uid}/mini-image-url?nodeLabel=${nodeLabel}`,
    {
      method: 'POST',
      body: JSON.stringify({
        url: urls.length ? urls : null
      }),
      headers: {
        Authorization: 'Bearer ' + token?.apiAccessToken,
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to save URLs to node')
  }

  return await response.json()
}
