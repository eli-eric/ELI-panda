import LoaderComponent from '@/components/loader.comp'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  actionButton?: React.ReactNode
  isPending?: boolean
}

export function PageLayout({
  children,
  title,
  actionButton,
  isPending
}: PageLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {actionButton}
        </div>
        {isPending ? (
          <div className="flex justify-center">
            <LoaderComponent />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
