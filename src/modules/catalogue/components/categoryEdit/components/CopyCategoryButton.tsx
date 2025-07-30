import { Copy } from 'lucide-react'
import type { FC } from 'react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface CopyCategoryButtonProps {
  handleCopyCategory: (e) => void
}

export const CopyCategoryButton: FC<CopyCategoryButtonProps> = ({
  handleCopyCategory
}) => {
  return (
    <DropdownMenuItem
      onClick={handleCopyCategory}
      className="flex items-center gap-2 w-full text-left"
    >
      <Copy className="h-4 w-4 transform transition-transform hover:scale-110 duration-300" />
      <span className="ml-2">Copy Category</span>
    </DropdownMenuItem>
  )
}
