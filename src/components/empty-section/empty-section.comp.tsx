import { Fragment } from 'react'

const EmptySectionComponent = () => (
  <Fragment>
    <div className="flex flex-1 min-h-full flex-col bg-white">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Select some system first, please
            </h1>
          </div>
        </div>
      </main>
    </div>
  </Fragment>
)

export default EmptySectionComponent
