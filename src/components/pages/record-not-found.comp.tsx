import Link from 'next/link'
import type { FC } from 'react'
import React from 'react'

import { Button } from '@/components/ui/button'

interface Props {
  returnUrl?: string
  onClick?: () => void
}

const RecordNotFound: FC<Props> = ({ returnUrl, onClick }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-extrabold text-primary">404</h1>
        <p className="mt-4 text-2xl font-semibold text-foreground">
          Record Not Found
        </p>
        <p className="mt-2 text-base text-muted-foreground">
          Sorry, the record you are looking for does not exist.
        </p>
        <div className="mt-6">
          {onClick ? (
            <Button onClick={onClick}>Return</Button>
          ) : returnUrl ? (
            <Button asChild>
              <Link href={returnUrl}>Return</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default RecordNotFound
