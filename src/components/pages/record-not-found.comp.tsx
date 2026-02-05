import Link from 'next/link'
import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

interface Props {
    returnUrl?: string
    onClick?: () => void
}

const RecordNotFound: FC<Props> = ({ returnUrl, onClick }) => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <h1 className="text-6xl font-extrabold text-primary">
                    {fm({ id: message.common.recordNotFound.title })}
                </h1>
                <p className="mt-4 text-2xl font-semibold text-foreground">
                    {fm({ id: message.common.recordNotFound.heading })}
                </p>
                <p className="mt-2 text-base text-muted-foreground">
                    {fm({ id: message.common.recordNotFound.message })}
                </p>
                <div className="mt-6">
                    {onClick ? (
                        <Button onClick={onClick}>
                            {fm({ id: message.common.buttons.return })}
                        </Button>
                    ) : returnUrl ? (
                        <Button asChild>
                            <Link href={returnUrl}>
                                {fm({ id: message.common.buttons.return })}
                            </Link>
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default RecordNotFound
