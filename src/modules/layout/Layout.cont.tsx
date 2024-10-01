import { useEffect } from 'react'

const LayoutContainer = () => {
  useEffect(() => {
    const handleMessage = event => {
      event.preventDefault()

      const { type, data } = event.data
      console.log('event', type, data)
    }

    window.addEventListener('click', handleMessage)

    return () => {
      window.removeEventListener('click', handleMessage)
    }
  }, [])

  return (
    <iframe
      src="https://layout.eli-beams.eu"
      className="h-full w-full"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    ></iframe>
  )
}

export default LayoutContainer
