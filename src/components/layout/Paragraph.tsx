import type { FC, PropsWithChildren } from 'react'

export const Paragraph: FC<PropsWithChildren> = ({ children }) => (
  <p className=" prose-sm mt-2 text-gray-500">{children}</p>
)
