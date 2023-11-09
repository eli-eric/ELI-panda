import { Fragment, useState } from 'react'

import Listbox from '@/components/form/Listbox'
import { CodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'

import { useSystemTypeGroups } from './hooks/useSystemTypeGroups'

export const SystemTypeComboBox = ({
  systemTypeField,
  className
}: {
  systemTypeField: FieldProps & {
    options?: Option[] | undefined
    codebook?: CODEBOOK | undefined
  }
  className?: string
}) => {
  const [open, setOpen] = useState(false)
  const { systemTypeGroups } = useSystemTypeGroups()

  return (
    <Fragment>
      <Listbox
        {...systemTypeField}
        className={className}
        onClickIcon={() => {
          setOpen(true)
        }}
      />
      <CodebookTreeModalGraphql
        tableId="systemType-tree"
        data={systemTypeGroups?.map(group => ({
          name: group.name,
          uid: group.uid,
          isExpandable: group?.systemTypes?.length > 0,
          children: group.systemTypes.map(systemType => ({
            name: systemType.name,
            uid: systemType.uid
          }))
        }))}
        open={open}
        selectParent={false}
        setOpen={setOpen}
        name={systemTypeField.name}
      />
    </Fragment>
  )
}
