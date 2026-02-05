import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

export const InitWizardButton: FC<PropsWithChildren<HTMLAttributes<HTMLButtonElement>>> = ({
    children,
    ...rest
}) => {
    return (
        <button
            {...rest}
            type="button"
            className="relative block w-full h-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            {children}
        </button>
    )
}
