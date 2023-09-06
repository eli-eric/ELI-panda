import type { TippyProps } from '@tippyjs/react'
import Tippy from '@tippyjs/react'

export const Tooltip = ({ children, ...rest }: TippyProps) => <Tippy {...rest}>{children}</Tippy>
