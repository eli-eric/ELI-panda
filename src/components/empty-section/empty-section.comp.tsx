import { Fragment } from 'react'

import EliLogoComponent from '@/components/eli-logo.comp'

const EmptySectionComponent = () => (
  <Fragment>
    <div className="flex flex-1 min-h-full flex-col bg-white">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <div className="inline-flex">
            <span className="sr-only">Your Company</span>
            <EliLogoComponent customClass="h-18 w-auto" />
          </div>
        </div>
        <div className="py-16">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Root Systems
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Select some system first
            </p>
          </div>
        </div>
      </main>
    </div>
  </Fragment>
)

export default EmptySectionComponent
