import { yupResolver } from '@hookform/resolvers/yup'
import type { FC, PropsWithChildren } from 'react'
import { memo, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Form } from '@/components/form/Form'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'

import Breadcrumbs from '../Breadcrumps'
import { SystemMainForm } from './components/SystemMain.form'
import { schema } from './SystemForm.schema'

const MemoizedSystemGallery = memo(ImageGallery)

import { useRouter } from 'next/router'

import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card, { FormCard } from '@/components/layout/Card'
import usePermission from '@/hooks/usePermission'
import { GraphModalButton } from '@/modules/shared/system/GraphModalButton'
import { ROLE } from '@/types/constants/roles'
import { SystemLevel } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'
import { cx } from '@/utils'

import { useSystemCreate } from '../../hooks/useSystemCreate'
import { useSystemDetail } from '../../hooks/useSystemDetail'
import { useSystemParent } from '../../hooks/useSystemParent'
import { useSystemUpdate } from '../../hooks/useSystemUpdate'
import { useSystemContext } from '../../store/useSystemContext'
import { useSystemItemStore } from '../../store/useSystemItemStore'
import type { SystemDetailFormType } from '../../types/form'
import { getColorBySystemLevel } from '../../utils'
import { ShowHistoryButton } from '../history/ShowHistoryButton'
import { SystemItemCard } from './components/SystemItem.card'

// Simple debounce function
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

//TODO:  split to update and create form
export const SystemForm: FC<PropsWithChildren> = ({ children }) => {
  const { systemDetail, catalogueItem, physicalItem } = useSystemDetail()
  const hasEditRole = usePermission([ROLE.SYSTEM_EDIT])
  const { parentPath, parentSystem } = useSystemParent()

  const { blockedEdit, setBlockedEdit } = useSystemContext()

  const {
    sparePartsConnection, // eslint-disable-line @typescript-eslint/no-unused-vars
    sparePartsCoverageSum, // eslint-disable-line @typescript-eslint/no-unused-vars
    sparePartsFor, // eslint-disable-line @typescript-eslint/no-unused-vars
    subSystems, // eslint-disable-line @typescript-eslint/no-unused-vars
    __typename, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...rest
  } = systemDetail || {}

  const router = useRouter()
  const uid = router.query.uid as string | undefined

  const systemImageRef = useRef<ImageGalleryRef>()

  const { updateSystem, loading } = useSystemUpdate(
    systemImageRef,
    physicalItem?.uid
  )
  const { createSystem, loading: createLoading } =
    useSystemCreate(systemImageRef)

  const isCreating = !uid

  const formMethods = useForm<any>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      ...rest,
      responsible:
        systemDetail?.responsible && systemDetail?.responsible?.fullName
          ? {
              uid: systemDetail?.responsible?.uid,
              name: systemDetail?.responsible?.fullName
            }
          : undefined,
      zone: systemDetail?.zone
        ? {
            uid: systemDetail?.zone?.uid,
            name: systemDetail?.zone?.name as string
          }
        : undefined,
      location: systemDetail?.location
        ? {
            uid: systemDetail?.location?.uid,
            name:
              systemDetail?.location?.name +
              ' (' +
              systemDetail?.location?.code +
              ')',
            code: systemDetail?.location?.code
          }
        : undefined,
      // For new systems, always set a default system level
      systemLevel: isCreating
        ? SystemLevel.SubsystemsAndParts
        : rest && 'systemLevel' in rest
          ? rest.systemLevel
          : SystemLevel.SubsystemsAndParts
    }
  })

  useEffect(() => {
    if (parentSystem) {
      const updates = {}

      if (parentSystem.responsible) {
        updates['responsible'] = {
          uid: parentSystem.responsible.uid,
          name: parentSystem.responsible.fullName
        }
      }

      if (parentSystem.zone) {
        updates['zone'] = {
          uid: parentSystem.zone.uid,
          name: parentSystem.zone.name as string
        }
      }

      if (parentSystem.location) {
        updates['location'] = {
          uid: parentSystem.location.uid,
          name: parentSystem.location.name as string
        }
      }

      if (Object.keys(updates).length > 0) {
        Object.entries(updates).forEach(([field, value]) => {
          formMethods.setValue(field, value, { shouldDirty: false })
        })
      }
    }
  }, [parentSystem, formMethods])

  const systemLevel = formMethods.watch('systemLevel')
  const onSubmit = (data: SystemDetailFormType) => {
    try {
      // Prevent multiple submissions
      if (loading || createLoading) {
        return
      }

      // Validate required fields
      if (!data.name || !data.systemLevel) {
        toast.error('Name and System Level are required')
        return
      }

      // Extract from data hasImageGalleryChanges
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hasImageGalleryChanges, ...rest } = data

      if (uid) {
        updateSystem(rest, false)
      } else {
        createSystem(rest, false)
      }
    } catch (error: any) {
      toast.error(`Failed to save system: ${error.message || 'Unknown error'}`)
    }
  }

  const onSubmitAndExit = (data: SystemDetailFormType) => {
    try {
      // Prevent multiple submissions
      if (loading || createLoading) {
        return
      }

      // Validate required fields
      if (!data.name || !data.systemLevel) {
        toast.error('Name and System Level are required')
        return
      }

      // Extract from data hasImageGalleryChanges
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hasImageGalleryChanges, ...rest } = data

      if (uid) {
        updateSystem(rest, true)
      } else {
        createSystem(rest, true)
      }
    } catch (error: any) {
      toast.error(`Failed to save system: ${error.message || 'Unknown error'}`)
    }
  }

  // Create debounced submit handlers
  const debouncedSubmit = useRef(
    debounce(() => {
      if (blockedEdit) return
      setBlockedEdit(true)

      try {
        const values = formMethods.getValues()
        if (!values.name || !values.systemLevel) {
          formMethods.trigger(['name', 'systemLevel'])
          toast.error('Please fill in all required fields')
          setBlockedEdit(false)
          return
        }

        formMethods.handleSubmit(onSubmit)()
      } catch (error: any) {
        toast.error('Failed to process form submission')
        setBlockedEdit(false)
      }
    }, 300)
  ).current

  const debouncedSubmitAndExit = useRef(
    debounce(() => {
      if (blockedEdit) return
      setBlockedEdit(true)

      try {
        const values = formMethods.getValues()
        if (!values.name || !values.systemLevel) {
          formMethods.trigger(['name', 'systemLevel'])
          toast.error('Please fill in all required fields')
          setBlockedEdit(false)
          return
        }

        formMethods.handleSubmit(onSubmitAndExit)()
      } catch (error: any) {
        toast.error('Failed to process form submission')
        setBlockedEdit(false)
      }
    }, 300)
  ).current

  // Reset blockedEdit when loading state changes
  useEffect(() => {
    if (!loading && !createLoading) {
      setBlockedEdit(false)
    }
  }, [loading, createLoading])

  // Import useSystemItemStore for cleanup
  const { clear: clearSystemStore } = useSystemItemStore()

  // Reset the form and clear store when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup function when component unmounts
      clearSystemStore()
    }
  }, [clearSystemStore])

  // Reset the form when component unmounts or on successful operation
  useEffect(() => {
    const resetForm = () => {
      if (formMethods) {
        try {
          formMethods.reset(formMethods.getValues())
        } catch (error) {
          console.error('Error resetting form:', error)
        }
      }
    }

    return resetForm
  }, [])

  return (
    <Form
      className="relative"
      formMethods={formMethods}
      enableLeaveWarning={true}
    >
      <HeaderWithButtons
        loading={loading || createLoading || blockedEdit}
        editRole={ROLE.SYSTEM_EDIT}
        onSubmit={debouncedSubmit}
        onSubmitAndExit={debouncedSubmitAndExit}
        customElement={
          <div className="flex gap-2">
            <GraphModalButton uid={uid} />
            <ShowHistoryButton />
          </div>
        }
      />
      <Card>
        <Breadcrumbs
          parentPath={
            (systemDetail?.parentPath as CodebookType[]) || parentPath
          }
        />
      </Card>
      <FormCard
        className={cx(
          'shadow-md rounded-lg border',
          getColorBySystemLevel(systemLevel as SystemLevel)
        )}
      >
        <SystemMainForm>
          <MemoizedSystemGallery
            ref={systemImageRef}
            setValue={formMethods.setValue}
            config={{
              itemCategory: FILE_TYPE.SYSTEM,
              itemId: uid ? String(uid) : 'new',
              additionalParams: catalogueItem?.uid
                ? {
                    itemCategory: FILE_TYPE.CATALOGUE,
                    itemId: catalogueItem?.uid
                  }
                : undefined
            }}
            className="w-full"
            disabled={blockedEdit}
            hasEditRole={hasEditRole}
          />
        </SystemMainForm>
        {uid && <SystemItemCard />}
      </FormCard>
      {children}
    </Form>
  )
}
