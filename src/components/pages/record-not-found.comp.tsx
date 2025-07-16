import Link from 'next/link'
import type { FC } from 'react'
import React from 'react'

interface Props {
  returnUrl: string
}

const RecordNotFound: FC<Props> = ({ returnUrl }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-extrabold text-orange-600 dark:text-orange-400">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-200">
          Record Not Found
        </p>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
          Sorry, the record you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Link
            href={returnUrl}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            Return
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecordNotFound
