import { FileOutput } from 'lucide-react'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { openModal } from '@/utils/modalHelpers'

import { RivExportDialogContainer } from './riv-export-dialog.cont'

export const RivExportButton = () => (
    <Tooltip content="Export to RIV">
        <div>
            <Button
                size="sm"
                variant="outline"
                onClick={() =>
                    openModal(
                        RivExportDialogContainer,
                        {},
                        {
                            title: 'Export to RIV',
                            size: 'l',
                            id: 'riv-export',
                        },
                    )
                }
            >
                <FileOutput className="h-4 w-4" />
            </Button>
        </div>
    </Tooltip>
)
