import type { FC, PropsWithChildren } from 'react'

import { classNames } from '@/utils'

interface Props {
  className?: string
}

export const LinkDecorator: FC<PropsWithChildren<Props>> = ({
  children,
  className
}) => <div className={classNames('link', className)}>{children}</div>
