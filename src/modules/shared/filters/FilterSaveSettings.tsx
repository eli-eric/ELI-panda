import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Modal } from '@/components/overlays/modal/modal.comp'
import { useFilterCreate } from '@/hooks/filter/useFilterCreate'
import { useFilterDetails } from '@/hooks/filter/useFilterDetails'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import type { ModalButtons } from '@/types/form'

interface Props {
  tableId: string
}
export const FilterSaveSettings = ({ tableId }: Props) => {
  const formMethods = useForm()
  const { createUserSettings } = useFilterCreate({ tableId, name: 'test' })
  const [open, setOpen] = useState(false)
  const inputFormMethods = useForm()

  const { storeFilters } = useFormFilterState({ tableId })
  const { filters, refetch } = useFilterDetails(tableId)
  const user = useSession().data?.user

  const submitNewFilter = data => {
    createUserSettings({
      variables: {
        input: [
          {
            key: `filter-${tableId}-${data.filterName.toLowerCase().split(' ').join('')}`,
            name: data.filterName,
            value: JSON.stringify(storeFilters),
            user: {
              connect: {
                where: {
                  node: {
                    uid: user?.uid
                  }
                }
              }
            }
          }
        ]
      },
      onCompleted: () => {
        refetch()
      }
    })
  }

  const buttons: ModalButtons = {
    goBack: {
      text: 'Cancel',
      onClick: () => setOpen(false)
    },
    goNext: {
      text: 'Save',
      onClick: () => {
        inputFormMethods.handleSubmit(submitNewFilter)()
        setOpen(false)
      }
    }
  }

  return (
    <div className="flex w-full">
      <Form formMethods={formMethods} className="flex w-full">
        <Listbox
          name="test"
          codebookResponse={filters?.map(filter => ({ name: filter.name, uid: filter.uid }))}
          position="top"
        />
        <Button className="pb-2" primary buttonSize="large">
          Apply
        </Button>
        <Button className="pb-2" primary buttonSize="large" disabled={storeFilters.length === 0}>
          Update
        </Button>
        <Button
          onClick={() => {
            setOpen(true)
          }}
          className="pb-2"
          primary
          disabled={storeFilters.length === 0}
          buttonSize="large"
        >
          New
        </Button>
      </Form>
      <Form formMethods={inputFormMethods}>
        <Modal open={open} setOpen={setOpen} buttons={buttons}>
          <Input placeholder="Type filter name" name="filterName" rounded="rounded-md" customLabel="Filter Name" />
        </Modal>
      </Form>
    </div>
  )
}
