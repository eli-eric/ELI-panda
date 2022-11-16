import { hasRole } from 'helpers/hooks/hasRole'
import { useAuth } from 'helpers/hooks/useAuth'
import { NextPage } from 'next'
import { Fragment } from 'react'
import { ROLES } from 'types/constants/roles'

const CataloguePage: NextPage = (): JSX.Element => {
  const { status, userRoles } = useAuth()

  const canViewCatalogue = hasRole(userRoles, ROLES.CATALOGUE_VIEW)
  const canViewReports = hasRole(userRoles, ROLES.REPORTS_VIEW)

  return (
    <Fragment>
      {status === 'authenticated' && (
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Catalogue</h1>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="py-4">
                {canViewCatalogue && (
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 mr-3 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    VIEW
                  </button>
                )}
                {canViewReports && (
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 mr-3 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    REPORTS
                  </button>
                )}


                <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
              </div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      )}
    </Fragment>
  )
}

export default CataloguePage
