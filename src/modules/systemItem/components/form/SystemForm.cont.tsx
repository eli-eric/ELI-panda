import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeft, FileText, Info, Save, Settings } from 'lucide-react'
import type { FC, PropsWithChildren } from 'react'
import { memo, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Form } from '@/components/form/Form'
import FileManager from '@/modules/shared/fileManager/FileManager'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'

import Breadcrumbs from '../Breadcrumps'
import { SystemMainForm } from './components/SystemMain.form'
import { schema } from './SystemForm.schema'

const MemoizedSystemGallery = memo(ImageGallery)

import { useRouter } from 'next/router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import usePermission from '@/hooks/usePermission'
import { cn } from '@/lib/utils'
import { GraphModalButton } from '@/modules/shared/system/GraphModalButton'
import { ROLE } from '@/types/constants/roles'
import { SystemLevel } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

import { useSystemCreate } from '../../hooks/useSystemCreate'
import { useSystemDetail } from '../../hooks/useSystemDetail'
import { useSystemParent } from '../../hooks/useSystemParent'
import { useSystemUpdate } from '../../hooks/useSystemUpdate'
import { useSystemContext } from '../../store/useSystemContext'
import { useSystemItemStore } from '../../store/useSystemItemStore'
import type { SystemDetailFormType } from '../../types/form'
import { getBorderBySystemLevel } from '../../utils'
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

interface SystemFormProps extends PropsWithChildren {
  subsystemsComponent?: React.ReactNode
}

//TODO:  split to update and create form
export const SystemForm: FC<SystemFormProps> = ({
  children,
  subsystemsComponent
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          // eslint-disable-next-line no-console
          console.error('Error resetting form:', error)
        }
      }
    }

    return resetForm
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form
      className="relative"
      formMethods={formMethods}
      enableLeaveWarning={true}
    >
      {/* Responsive header */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          {/* Desktop header - with title */}
          <div className="hidden sm:flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Settings className="size-5 text-muted-foreground flex-shrink-0" />
              <h1 className="text-lg sm:text-xl font-semibold truncate">
                {uid
                  ? formMethods.watch('name') || 'System Details'
                  : 'Create New System'}
              </h1>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden lg:inline">Back</span>
              </Button>
              <div className="h-4 w-px bg-border" />
              <ShowHistoryButton />
              <div className="h-4 w-px bg-border" />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={debouncedSubmit}
                  disabled={loading || createLoading || blockedEdit}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  onClick={debouncedSubmitAndExit}
                  disabled={loading || createLoading || blockedEdit}
                >
                  Save and Exit
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile header - only buttons */}
          <div className="flex sm:hidden items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <SidebarTrigger /> */}
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <GraphModalButton uid={uid} />
              <ShowHistoryButton />
              <Button
                variant="outline"
                size="sm"
                onClick={debouncedSubmit}
                disabled={loading || createLoading || blockedEdit}
                title="Save"
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={debouncedSubmitAndExit}
                disabled={loading || createLoading || blockedEdit}
                title="Save and Exit"
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - Full width */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            parentPath={
              (systemDetail?.parentPath as CodebookType[]) || parentPath
            }
          />

          {/* Clean responsive layout: 1 col → 2 col → 3 col */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Left column - Images and System Details */}
            <div className="space-y-6">
              {/* Images Card */}
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
                className="w-full order-1"
                disabled={blockedEdit}
                hasEditRole={hasEditRole}
              />

              {/* System Details Card */}
              <Card
                className={cn(
                  'order-2',
                  systemLevel && getBorderBySystemLevel(systemLevel)
                )}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Info className="size-6 text-primary" />
                    <CardTitle>System Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <SystemMainForm />
                  {/* Files Card */}
                  {uid && (
                    <FileManager
                      itemType={FILE_TYPE.SYSTEM}
                      uid={uid}
                      hasEditRole={hasEditRole}
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Middle/Right column - Physical Item and Tables */}
            <div className="space-y-6">
              {/* Physical Item Card - SINGLE INSTANCE */}
              {uid && (
                <Card className="border-amber-500 dark:border-amber-400 border-2 order-3">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="size-6 text-primary" />
                        <CardTitle>Physical Item</CardTitle>
                      </div>
                      <SystemItemCard showHeaderActions />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <SystemItemCard hideActions />
                  </CardContent>
                </Card>
              )}

              {/* Tables - only on 2-column layout */}
              <div className="space-y-6 xl:hidden order-4">
                {/* Spare Parts sections */}
                <div className="space-y-6">{children}</div>

                {/* Subsystems */}
                <div>{subsystemsComponent}</div>

                {/* Files Card */}
                {uid && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <FileText className="size-6 text-primary" />
                        <CardTitle>Files</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <FileManager
                        itemType={FILE_TYPE.SYSTEM}
                        uid={uid}
                        hasEditRole={hasEditRole}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Third column - Tables (only on 3-column layout) */}
            <div className="space-y-6 hidden xl:block">
              {/* Spare Parts sections */}
              <div className="space-y-6">{children}</div>

              {/* Subsystems */}
              <div>{subsystemsComponent}</div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}
