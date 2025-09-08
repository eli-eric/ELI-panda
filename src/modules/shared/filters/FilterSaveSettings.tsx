import { Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import type { UseFormReset } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { useFilterCreate } from '@/hooks/filter/useFilterCreate'
import { useFilterDelete } from '@/hooks/filter/useFilterDelete'
import { useFilterDetails } from '@/hooks/filter/useFilterDetails'
import { useFilterUpdate } from '@/hooks/filter/useFilterUpdate'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useFormControlStore } from '@/store/useFormControlStore'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

interface Props {
  tableId: string
  enableQueryURL: boolean
  resetForm: UseFormReset<any>
  defaulFormValues: any
}
export const FilterSaveSettings = ({
  tableId,
  enableQueryURL,
  resetForm,
  defaulFormValues
}: Props) => {
  const formMethods = useForm()
  const savedFilter = formMethods.watch('savedFilter')
  const inputFormMethods = useForm()
  const { storeFilters, setColumnFilters } = useFormFilterState({
    tableId,
    enableQueryUrl: enableQueryURL
  })
  const { addCustomFieldIdToSync } = useFormControlStore()

  const { createUserSettings } = useFilterCreate({ tableId })
  const { filters, refetch } = useFilterDetails(tableId)

  const { updateSavedFilter } = useFilterUpdate()
  const user = useSession().data?.user

  const handleUpdateSavedFilter = () => {
    updateSavedFilter(
      {
        where: {
          uid: savedFilter?.uid
        },
        update: {
          value: JSON.stringify(storeFilters)
        }
      },
      {
        onError: () => {
          toast.error('Error updating filter')
        },
        onSuccess: () => {
          refetch()
          formMethods.setValue('savedFilter', {
            ...savedFilter,
            value: JSON.stringify(storeFilters)
          })
          toast.success('Filter updated successfully')
        }
      }
    )
  }

  const submitNewFilter = data => {
    createUserSettings(
      {
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
      {
        onError: () => {
          toast.error('Error creating filter')
        },
        onSuccess: () => {
          refetch()
          closeModal('dialog1')
          toast.success('Filter created successfully')
        }
      }
    )
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
          const defValues = Object.keys(defaulFormValues).reduce(
            (acc, curr) => {
              const filter = value.find(item => item.id === curr)
              if (filter) {
                acc[curr] = filter.value
              } else {
                acc[curr] = defaulFormValues[curr]
              }
              return acc
            },
            {}
          )
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
  const { openModal, closeModal } = useModalGlobalStore()

  const openSaveFilterModal = () => {
    openModal('dialog1', {
      component: () => (
        <Form formMethods={inputFormMethods}>
          <Input
            placeholder="Type filter name"
            name="filterName"
            rounded="rounded-md"
            customLabel="Filter Name"
          />
        </Form>
      ),
      props: {
        title: 'Save Filter',
        size: 'm'
      },
      onSubmit: () => {
        inputFormMethods.handleSubmit(submitNewFilter)()
      }
    })
  }
  const { deleteSavedFilter } = useFilterDelete()
  const handleDeleteFilter = () => {
    if (savedFilter) {
      deleteSavedFilter(
        {
          where: {
            uid: savedFilter.uid
          }
        },
        {
          onError: () => {
            toast.error('Error deleting filter')
          },
          onSuccess: () => {
            formMethods.setValue('savedFilter', null)
            resetForm(defaulFormValues, { keepValues: false })
            refetch()
            toast.success('Filter deleted successfully')
          }
        }
      )
    }
  }

  return (
    <div className="flex w-full">
      <Form formMethods={formMethods} className="flex w-full">
        <Button
          onClick={handleDeleteFilter}
          disabled={!savedFilter}
          className="pb-2"
        >
          <Trash2 className="h-5 w-5" aria-hidden="true" />
        </Button>
        <Listbox name="savedFilter" codebookResponse={filters} position="top" />
        <Button onClick={applyFilter} disabled={!savedFilter} className="pb-2">
          Apply
        </Button>
        <Button
          onClick={handleUpdateSavedFilter}
          className="pb-2"
          disabled={storeFilters.length === 0 || !savedFilter}
        >
          Update
        </Button>
        <Button
          onClick={openSaveFilterModal}
          className="pb-2 whitespace-nowrap"
          disabled={storeFilters.length === 0}
        >
          Save new
        </Button>
      </Form>
    </div>
  )
}
