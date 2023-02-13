import { CheckIcon } from '@heroicons/react/20/solid'
import { NoSymbolIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
const Title = ({ data, isEditMode, setIsEditMode, discard, register }) => {
  return (
    <div className="flex w-full">
      {isEditMode ? (
        <input placeholder="Title" {...register('name')} className="text-2xl w-full" />
      ) : (
        <h1 className="text-2xl">{data.name}</h1>
      )}
      <div className="flex">
        {isEditMode ? (
          <>
            <button type="submit">
              <CheckIcon className="h-6 hover:text-orange-600" />
            </button>
            <button onClick={() => discard()}>
              <NoSymbolIcon className="h-6 hover:text-orange-600" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditMode(true)}>
              <PencilSquareIcon className="h-6 hover:text-orange-600" />
            </button>
            <button
              onClick={() => {
                console.log('delete')
              }}
            >
              <TrashIcon className="h-6 hover:text-orange-600" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Title
