import { Fragment, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import { MinusButton, PlusButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import type { CodebookType } from '@/types/responses/codebook'
import type { SystemDetail } from '@/types/responses/systems'
import { classNames } from '@/utils'

import { FilterBadges } from '../shared/form/FilterBadges'
import { SystemFilterButtonContainer } from '../systems/components/filters/SystemsFilterButton.cont'
import { SystemsComponent } from '../systems/Systems.comp'
import { SystemMovingModal } from './form/SystemMoving.modal'
import { useSystemMovingStore } from './store/useSystemMovingStore'

interface SystemsMovingType extends SystemDetail {
  tableId: string
}

export type SystemMovingFormType = {
  name: string
  systemAlias?: string
  description?: string
  responsible?: CodebookType
  systemType?: CodebookType
  systemCode?: string
  zone?: CodebookType
  location?: CodebookType
}

const SystemsMovingContainer = () => {
  const { tableIdLeft, tableIdRight, setChildSystem, setParentSystem } =
    useSystemMovingStore()
  const [openModal, setOpenModal] = useState(false)

  const onDropHandler = useCallback(
    (from: SystemsMovingType, to: SystemsMovingType) => {
      const isNotAllowedToMove =
        to.parentPath?.some(parent => parent.uid === from.uid) ||
        from.uid === to.uid ||
        false
      if (isNotAllowedToMove) {
        toast.error('System cannot be moved under itself or its sub-systems')
        return
      }
      setChildSystem(from)
      setParentSystem(to)
      setOpenModal(true)
    },
    [setChildSystem, setParentSystem, setOpenModal]
  )

  const [showLeft, setShowLeft] = useState(true)
  const toggleLeft = useCallback(() => setShowLeft(!showLeft), [showLeft])

  const [showRight, setShowRight] = useState(true)
  const toggleRight = useCallback(() => setShowRight(!showRight), [showRight])

  return (
    <Fragment>
      <div
        className={classNames(
          'grid',
          showLeft && showRight ? 'grid-cols-2' : 'grid-cols-1'
        )}
      >
        {showLeft && (
          <SystemsComponent
            tableId={tableIdLeft}
            hideButtons={false}
            enableDragAndDrop={true}
            className="border-r-4 border-gray-400"
            dropSettings={{ onDropHandler, accept: 'system' }}
            enableQueryURL={false}
            LeftSearchBarElement={() => (
              <SystemFilterButtonContainer
                tableId={tableIdLeft}
                enableQueryURL={false}
              />
            )}
            RightSearchBarElement={() => (
              <>
                <FilterBadges tableId={tableIdLeft} />
                {showRight ? (
                  <Tooltip content="Hide systems window">
                    <div>
                      <MinusButton onClick={toggleLeft} />
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip content="Show systems window">
                    <div>
                      <PlusButton onClick={toggleRight} />
                    </div>
                  </Tooltip>
                )}
              </>
            )}
          />
        )}
        {showRight && (
          <SystemsComponent
            tableId={tableIdRight}
            hideButtons={false}
            enableDragAndDrop={true}
            dropSettings={{ onDropHandler: onDropHandler, accept: 'system' }}
            LeftSearchBarElement={() => (
              <SystemFilterButtonContainer
                panelSlide="right"
                tableId={tableIdRight}
                enableQueryURL={false}
              />
            )}
            enableQueryURL={false}
            RightSearchBarElement={() => (
              <>
                <FilterBadges tableId={tableIdRight} />
                {showLeft ? (
                  <Tooltip content="Hide systems window">
                    <div>
                      <MinusButton onClick={toggleRight} />
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip content="Show systems window">
                    <div>
                      <PlusButton onClick={toggleLeft} />
                    </div>
                  </Tooltip>
                )}
              </>
            )}
          />
        )}
      </div>

      <SystemMovingModal open={openModal} setOpen={setOpenModal} />
    </Fragment>
  )
}

export default SystemsMovingContainer
