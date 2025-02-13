import type { FC, PropsWithChildren } from 'react'

import { cx } from '@/utils'

interface Props {
  className?: string
}

export const LinkDecorator: FC<PropsWithChildren<Props>> = ({
  children,
  className
}) => <div className={cx('link', className)}>{children}</div>
