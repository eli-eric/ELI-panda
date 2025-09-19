import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { memo, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { Skeleton } from '@/components/ui/skeleton'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { ROLE } from '@/types/constants/roles'
import { SystemLevel } from '@/types/gql/graphql'

import { SystemDetailSection } from '../system-edit/components/sections/system-detail.section'
import { SystemHierarchy } from './components/SystemHierarchy.comp'
import { useSystemCreate } from './hooks/useSystemCreate'
import { useSystemCreateParent } from './hooks/useSystemCreateParent'
import { type SystemCreateFormData, systemCreateSchema } from './schema'

const MemoizedImageGallery = memo(ImageGallery)

export const SystemCreateContainer: FC = () => {
  const {
    parentSystem,
    parentPath,
    loading: parentLoading
  } = useSystemCreateParent()

  const systemImageRef = useRef<ImageGalleryRef | undefined>(undefined)

  const formMethods = useForm<SystemCreateFormData>({
    resolver: zodResolver(systemCreateSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      systemType: null,
      systemLevel: SystemLevel.SubsystemsAndParts,
      location: null,
      zone: null,
      systemCode: null,
      attribute: null,
      responsible: null,
      description: ''
    }
  })

  const {
    formState: { isDirty }
  } = formMethods

  // Set parent system defaults when available
  useEffect(() => {
    if (parentSystem) {
      if (parentSystem.responsible) {
        formMethods.setValue(
          'responsible',
          {
            uid: parentSystem.responsible.uid,
            name: parentSystem.responsible.fullName || 'N/A'
          },
          { shouldDirty: false }
        )
      }

      if (parentSystem.zone) {
        formMethods.setValue(
          'zone',
          {
            uid: parentSystem.zone.uid,
            name: parentSystem.zone.name
          },
          { shouldDirty: false }
        )
      }

      if (parentSystem.location) {
        formMethods.setValue(
          'location',
          {
            uid: parentSystem.location.uid,
            name: parentSystem.location.name
          },
          { shouldDirty: false }
        )
      }
    }
  }, [parentSystem, formMethods])

  const { createSystem, loading } = useSystemCreate(systemImageRef)
  const { closeModal } = useModalGlobalStore()

  const onSubmit = (data: SystemCreateFormData) => {
    createSystem(data)
  }

  const onExit = () => {
    closeModal('sheet')
  }

  const systemLevel = formMethods.watch('systemLevel') as SystemLevel
  const systemName = formMethods.watch('name')

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <SheetFormButtons
        editRole={ROLE.SYSTEM_EDIT}
        loading={loading}
        onSubmit={formMethods.handleSubmit(onSubmit)}
        onExit={onExit}
        isFormDirty={isDirty}
        saveLabel="Create System"
        loadingText="Creating system..."
      />

      <div className="space-y-4">
        <MemoizedImageGallery
          ref={systemImageRef}
          setValue={formMethods.setValue}
          config={{
            itemCategory: FILE_TYPE.SYSTEM,
            itemId: 'new'
          }}
          className="w-full"
          hasEditRole={true}
        />
        {parentLoading && <Skeleton className="h-6 w-full" />}
        {parentPath.length > 0 && (
          <SystemHierarchy
            parentPath={parentPath}
            currentSystemName={systemName || 'New System'}
            currentSystemLevel={systemLevel}
          />
        )}

        <SystemDetailSection />
      </div>
    </Form>
  )
}
