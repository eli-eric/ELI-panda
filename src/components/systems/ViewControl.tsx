import { useFormContext } from 'react-hook-form'

export default function ViewControl() {
  const { register } = useFormContext()
  return (
    <div className="mb-5 flex justify-center py-3">
      <fieldset className="space-x-5 flex flex-row">
        <legend className="sr-only">View</legend>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="system"
              {...register('system')}
              aria-describedby="comments-description"
              name="system"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700">System Detail</label>
            <span id="comments-description" className="text-gray-500">
              <span className="sr-only">System Detail </span>
            </span>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="relations"
              {...register('relations')}
              aria-describedby="candidates-description"
              name="relations"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700">Relations</label>
            <span id="candidates-description" className="text-gray-500">
              <span className="sr-only">Relations </span>
            </span>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
