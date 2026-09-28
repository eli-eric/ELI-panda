import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useWosImportDialog } from '../wos-import/hooks/useWosImportDialog'

/** Fetch (create) / Refresh (edit) from Web of Science, placed beside the DOI input. */
export const WosImportButton = () => {
    const { isVisible, isDisabled, isLoading, label, open } = useWosImportDialog()

    if (!isVisible) return null

    return (
        <Button
            type="button"
            variant="outline"
            disabled={isDisabled}
            aria-busy={isLoading}
            onClick={() => void open()}
            data-testid="wos-import-button"
        >
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
            {label}
        </Button>
    )
}
