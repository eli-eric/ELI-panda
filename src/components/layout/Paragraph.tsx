import type { FC, PropsWithChildren } from 'react'

export const Paragraph: FC<PropsWithChildren> = ({ children }) => (
  <p className="text-sm prose-sm mt-2 text-foreground">{children}</p>
)
