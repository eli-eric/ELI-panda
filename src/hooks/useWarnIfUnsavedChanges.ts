import Router from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useWarnIfUnsavedChanges = (unsavedChanges: boolean, setModalOpen: Dispatch<SetStateAction<boolean>>) => {
  const [next, setNext] = useState<boolean>(false)
  const [nextUrl, setNextUrl] = useState<string>()
  useEffect(() => {
    setNextUrl(undefined)
    if (!next) {
      if (unsavedChanges) {
        const routeChangeStart = url => {
          if (!next) {
            Router.events.emit('routeChangeError')
            setModalOpen(true)
            setNextUrl(url)
            throw 'Abort route change. Please ignore this error.'
          }
        }
        Router.events.on('routeChangeStart', routeChangeStart)

        return () => {
          Router.events.off('routeChangeStart', routeChangeStart)
        }
      }
    }
  }, [unsavedChanges, next]) //eslint-disable-line

  return { setNext, nextUrl, setNextUrl }
}
