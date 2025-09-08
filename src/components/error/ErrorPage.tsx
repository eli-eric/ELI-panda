import { XCircle } from 'lucide-react'

function ErrorPage() {
  return (
    <div className="rounded-md bg-red-50 p-4 mt-5">
      <div className="flex">
        <div className="shrink-0">
          <XCircle className="h-4 w-4 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Something went wrong!
          </h3>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
