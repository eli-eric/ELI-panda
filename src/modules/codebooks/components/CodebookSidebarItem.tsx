import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
    code: string
    isSelected: boolean
    onClick: () => void
}

export const CodebookSidebarItem = ({ code, isSelected, onClick }: Props) => (
    <Button
        variant={isSelected ? 'secondary' : 'ghost'}
        className={cn('w-full justify-start font-mono text-sm', isSelected && 'bg-accent')}
        onClick={onClick}
    >
        {code}
    </Button>
)
