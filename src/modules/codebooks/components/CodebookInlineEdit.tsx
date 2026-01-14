import { Check, Loader2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  value: string
  onSave: (newValue: string) => Promise<void>
  isPending?: boolean
}

export const CodebookInlineEdit = ({ value, onSave, isPending }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  useEffect(() => {
    setEditValue(value)
  }, [value])

  const handleSave = async () => {
    if (editValue.trim() === '') return
    if (editValue === value) {
      setIsEditing(false)
      return
    }

    try {
      await onSave(editValue.trim())
      setIsEditing(false)
    } catch {
      // Error handled by toast.promise in mutation
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="-mx-2 w-full rounded px-2 py-1 text-left font-medium transition-colors hover:bg-muted/50"
      >
        {value}
      </button>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <Input
        ref={inputRef}
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isPending}
        className="h-8"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
        onClick={handleSave}
        disabled={isPending || editValue.trim() === ''}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
        onClick={handleCancel}
        disabled={isPending}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
