import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

interface Props {
  message: string
}

const AuthAlertComponent = ({ message }: Props) => (
  <div className="rounded-md bg-yellow-50 p-4">
    <div className="flex">
      <div className="shrink-0">
        <ExclamationTriangleIcon
          className="h-4 w-4

 text-yellow-400"
          aria-hidden="true"
        />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-yellow-800">{message}</h3>
      </div>
    </div>
  </div>
)

export default AuthAlertComponent
