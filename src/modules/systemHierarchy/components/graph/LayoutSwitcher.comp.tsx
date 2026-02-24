import { GitBranch, Waypoints } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import type { GraphLayoutMode } from '../../types/graph'
import { GRAPH_LAYOUT_MODES } from '../../types/graph'

interface LayoutSwitcherProps {
    activeLayout: GraphLayoutMode
    onLayoutChange: (mode: GraphLayoutMode) => void
}

export const LayoutSwitcher: FC<LayoutSwitcherProps> = ({ activeLayout, onLayoutChange }) => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="flex gap-1">
            <Button
                variant={activeLayout === GRAPH_LAYOUT_MODES.HIERARCHY ? 'default' : 'outline'}
                size="sm"
                data-state={activeLayout === GRAPH_LAYOUT_MODES.HIERARCHY ? 'on' : 'off'}
                onClick={() => onLayoutChange(GRAPH_LAYOUT_MODES.HIERARCHY)}
                title={fm({ id: message.systemHierarchy.graph.layout.hierarchy })}
            >
                <GitBranch className="h-3.5 w-3.5" />
            </Button>
            <Button
                variant={activeLayout === GRAPH_LAYOUT_MODES.FORCE ? 'default' : 'outline'}
                size="sm"
                data-state={activeLayout === GRAPH_LAYOUT_MODES.FORCE ? 'on' : 'off'}
                onClick={() => onLayoutChange(GRAPH_LAYOUT_MODES.FORCE)}
                title={fm({ id: message.systemHierarchy.graph.layout.force })}
            >
                <Waypoints className="h-3.5 w-3.5" />
            </Button>
        </div>
    )
}
