'use client'

import { useTheme } from 'next-themes'
import type { ToasterProps } from 'sonner'
import { Toaster as Sonner } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            position="top-center"
            richColors
            toastOptions={{
                style: {
                    background: 'var(--popover)',
                    color: 'var(--popover-foreground)',
                    border: '1px solid var(--border)',
                },
                classNames: {
                    error: 'toast-error',
                    success: 'toast-success',
                    warning: 'toast-warning',
                    info: 'toast-info',
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
