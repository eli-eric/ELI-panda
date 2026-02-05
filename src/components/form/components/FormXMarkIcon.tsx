import { X } from 'lucide-react'

interface Props {
    onClick: () => void
}

export const FormXMarkIcon = ({ onClick }: Props) => (
    <div
        onClick={onClick}
        className="absolute mr-7 inset-y-0 right-0 flex items-center rounded-r-md px-1 focus:outline-none cursor-pointer text-gray-200  hover:text-red-500"
    >
        <X className="h-4 w-4" aria-hidden="true" />
    </div>
)
