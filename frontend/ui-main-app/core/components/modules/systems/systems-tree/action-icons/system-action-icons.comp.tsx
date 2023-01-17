import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

const SystemActionIconsComponent = () => {
  return (
    <div className="flex">
      <PencilSquareIcon className="h-5 w-5" />
      <TrashIcon className="h-5 w-5" />
      <PlusIcon className="h-5 w-5" />
    </div>
  )
}

export default SystemActionIconsComponent
