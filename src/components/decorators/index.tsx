import type { FC, PropsWithChildren } from 'react'

export const LinkDecorator: FC<PropsWithChildren> = ({ children }) => (
  <div className={'text-blue-700 cursor-pointer hover:underline'}>{children}</div>
)
