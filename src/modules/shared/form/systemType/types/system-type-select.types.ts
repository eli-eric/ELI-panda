import type { ModalSize } from '@/components/ui/dialog'
import type { CodebookType } from '@/types/responses/codebook'

// API response types
export interface SystemTypeTreeItem {
  uid: string
  name: string
  code: string
}

export interface SystemTypeGroupTreeItem {
  uid: string
  name: string
  code: string
  children: SystemTypeTreeItem[]
}

// Tree row for PandaTableControlled (keeps expand/collapse)
export interface SystemTypeTreeRow {
  uid: string
  name: string
  code?: string
  isGroup: boolean
  isExpandable?: boolean
  children?: SystemTypeTreeRow[]
}

// Component props
export interface SystemTypeModalContentProps {
  title?: string
  size?: ModalSize
  onSelect: (systemType: CodebookType | null) => void
  onClose?: () => void
}
