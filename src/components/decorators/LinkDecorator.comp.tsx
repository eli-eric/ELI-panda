import type { FC, PropsWithChildren } from 'react'

export const LinkDecorator: FC<PropsWithChildren> = ({ children }) => (
  <div className={'link'}>{children}</div>
)
