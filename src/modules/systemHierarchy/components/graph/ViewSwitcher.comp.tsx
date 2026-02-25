import { List, Share2 } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import type { HierarchyView } from '../../types/constants'
import { HIERARCHY_VIEWS } from '../../types/constants'

interface ViewSwitcherProps {
    activeView: HierarchyView
    onViewChange: (view: HierarchyView) => void
}

export const ViewSwitcher: FC<ViewSwitcherProps> = ({ activeView, onViewChange }) => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="flex gap-0.5">
            <Button
                variant={activeView === HIERARCHY_VIEWS.TREE ? 'default' : 'outline'}
                size="sm"
                data-state={activeView === HIERARCHY_VIEWS.TREE ? 'on' : 'off'}
                onClick={() => onViewChange(HIERARCHY_VIEWS.TREE)}
                className="h-7 px-2 text-xs"
            >
                <List className="size-3 mr-1" />
                {fm({ id: message.systemHierarchy.graph.viewTree })}
            </Button>
            <Button
                variant={activeView === HIERARCHY_VIEWS.GRAPH ? 'default' : 'outline'}
                size="sm"
                data-state={activeView === HIERARCHY_VIEWS.GRAPH ? 'on' : 'off'}
                onClick={() => onViewChange(HIERARCHY_VIEWS.GRAPH)}
                className="h-7 px-2 text-xs"
            >
                <Share2 className="size-3 mr-1" />
                {fm({ id: message.systemHierarchy.graph.viewGraph })}
            </Button>
        </div>
    )
}
