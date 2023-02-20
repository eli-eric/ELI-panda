import {
  CheckIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

import Button from '@/components/ui/Buttons'

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
