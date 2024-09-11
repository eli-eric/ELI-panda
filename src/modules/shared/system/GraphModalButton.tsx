import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { PlusButton } from '@/components/Buttons'
import ModalComponent from '@/components/overlays/modal/modal.comp'

import { GraphView } from './GraphView'
import type { SystemGraphResponse } from './types'

const data: SystemGraphResponse = {
  nodes: [
    {
      uid: '1',
      name: 'System',
      properties: {
        test: 'test'
      }
    },
    {
      uid: '2',
      name: 'Subsystem 1',
      properties: {
        test: 'test'
      }
    },
    {
      uid: '3',
      name: 'Subsystem 2',
      properties: {
        test: 'test'
      }
    }
  ],
  links: [
    {
      source: '1', // uid of source Node
      relationship: 'HAS_SUBSYSTEM', // Relationship between the nodes
      target: '2' // uid of target Node
    },
    {
      source: '1',
      relationship: 'HAS_SUBSYSTEM',
      target: '3'
    }
  ]
}

export const GraphModalButton: FC = () => {
  const [open, setOpen] = useState(false)

  function openModal() {
    setOpen(true)
  }

  return (
    <Fragment>
      <PlusButton onClick={openModal} />
      <ModalComponent open={open} setOpen={setOpen}>
        <GraphView data={data} />
      </ModalComponent>
    </Fragment>
  )
}
