import { AlertCircle, ChevronDown } from 'lucide-react'

export const ValidationIcon = () => (
    <div
        data-testid="validation-icon"
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
    >
        <AlertCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
    </div>
)

interface ChevronDownProps {
    onClick?: () => void
}
export const ChevronDownIcon = ({ onClick }: ChevronDownProps) => (
    <ChevronDown
        onClick={onClick}
        className="h-4 w-4 text-gray-500 dark:text-gray-200"
        aria-hidden="true"
    />
)
