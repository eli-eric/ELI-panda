import type { FC, PropsWithChildren } from 'react'

import { cx } from '@/utils'

interface Props {
  className?: string
  title?: string
}

export const LinkDecorator: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  title
}) => (
  <div title={title} className={cx('link', className)}>
    {children}
  </div>
)
