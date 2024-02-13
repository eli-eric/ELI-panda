import { useSession } from 'next-auth/react'
import { useState } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Modal } from '@/components/overlays/modal/modal.comp'
import { useFilterCreate } from '@/hooks/filter/useFilterCreate'
import { useFilterDetails } from '@/hooks/filter/useFilterDetails'
import { useFilterUpdate } from '@/hooks/filter/useFilterUpdate'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useFormControlStore } from '@/store/useFormControlStore'
import type { ModalButtons } from '@/types/form'

interface Props {
  tableId: string
  enableQueryURL: boolean
  resetForm: UseFormReset<any>
  defaulFormValues: any
}
export const FilterSaveSettings = ({ tableId, enableQueryURL, resetForm, defaulFormValues }: Props) => {
  const formMethods = useForm()
  const savedFilter = formMethods.watch('savedFilter')
  const inputFormMethods = useForm()
  const [open, setOpen] = useState(false)
  const { storeFilters, setColumnFilters } = useFormFilterState({ tableId, enableQueryUrl: enableQueryURL })
  const { addCustomFieldIdToSync } = useFormControlStore()

  const { createUserSettings, loading } = useFilterCreate({ tableId })
  const { filters, refetch } = useFilterDetails(tableId)

  const { updateSavedFilter } = useFilterUpdate(savedFilter?.uid, storeFilters)
  const user = useSession().data?.user

  const handleUpdateSavedFilter = () => {
    updateSavedFilter({
      variables: {
        input: {
          where: {
            uid: savedFilter?.uid
          },
          update: {
            value: JSON.stringify(storeFilters)
          }
        }
      },
      onError: () => {
        toast.error('Error updating filter')
      },
      onCompleted: () => {
        refetch()
        formMethods.setValue('savedFilter', { ...savedFilter, value: JSON.stringify(storeFilters) })
        toast.success('Filter updated successfully')
      }
    })
  }

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
      onError: () => {
        toast.error('Error creating filter')
      },
      onCompleted: () => {
        refetch()
        setOpen(false)
        toast.success('Filter created successfully')
      }
    })
  }

  const applyFilter = () => {
    if (savedFilter) {
      const value = JSON.parse(savedFilter.value)
      value.forEach(filter => {
        if (filter.type) {
          addCustomFieldIdToSync(filter.id)
        }
      })
      resetForm(
        () => {
          const defValues = Object.keys(defaulFormValues).reduce((acc, curr) => {
            const filter = value.find(item => item.id === curr)
            if (filter) {
              acc[curr] = filter.value
            } else {
              acc[curr] = defaulFormValues[curr]
            }
            return acc
          }, {})
          value.forEach(filter => {
            if (filter.type) {
              defValues[filter.id] = filter.value
            }
          })
          return defValues
        },

        { keepValues: false }
      )
      //wait for form to reset otherwise it will not have the correct values in filter state
      setTimeout(() => {
        setColumnFilters(value)
      }, 1000)
    }
  }
  const buttons: ModalButtons = {
    goBack: {
      text: 'Cancel',
      onClick: () => setOpen(false)
    },
    goNext: {
      text: 'Save',
      loading,
      onClick: () => {
        inputFormMethods.handleSubmit(submitNewFilter)()
      }
    }
  }

  return (
    <div className="flex w-full">
      <Form formMethods={formMethods} className="flex w-full">
        <Listbox name="savedFilter" codebookResponse={filters} position="top" />
        <Button onClick={applyFilter} disabled={!savedFilter} className="pb-2" primary buttonSize="large">
          Apply
        </Button>
        <Button
          onClick={handleUpdateSavedFilter}
          className="pb-2"
          primary
          buttonSize="large"
          disabled={storeFilters.length === 0 || !savedFilter}
        >
          Update
        </Button>
        <Button
          onClick={() => {
            setOpen(true)
          }}
          className="pb-2 whitespace-nowrap"
          primary
          disabled={storeFilters.length === 0}
          buttonSize="large"
        >
          Save new
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
