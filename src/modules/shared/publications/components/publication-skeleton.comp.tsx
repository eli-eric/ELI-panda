import { FormFieldSkeleton } from '@/components/form/shared/field-form.skeleton'
import { Skeleton } from '@/components/ui/skeleton'

const PublicationSkeleton = () => (
  <div>
    <div className="border-b top-0 z-10 ">
      <div className="flex gap-2 p-2 flex-row-reverse">
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
      </div>
    </div>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6 flex flex-col gap-2">
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton className="h-20" />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
    </div>
  </div>
)

export default PublicationSkeleton
