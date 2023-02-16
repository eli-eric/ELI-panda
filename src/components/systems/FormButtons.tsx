import { CheckIcon, NoSymbolIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export const Button = props => (
  <button
    {...props}
    className="hover:text-orange-600 relative z-0 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
  />
)

const FormButtons = ({ isEditMode, setIsEditMode, discard }) => {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      {isEditMode ? (
        <>
          <Button type="submit">
            <CheckIcon className="h-5" />
          </Button>
          <Button onClick={() => discard()}>
            <NoSymbolIcon className="h-5" />
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => setIsEditMode(true)}>
            <PencilSquareIcon className="h-5" />
          </Button>
          <Button
            onClick={() => {
              console.log('delete')
            }}
          >
            <TrashIcon className="h-5" />
          </Button>
        </>
      )}
    </span>
  )
}

export default FormButtons
