import React from 'react'

interface Props {
  children: React.ReactNode
}

const ContainerComponent = ({ children }: Props) => {
  return <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
}

export default ContainerComponent
