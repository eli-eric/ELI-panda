import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { message } from 'src/i18n/src/messages'

const messages = message.layout.profile

const ProfileCardComponent = () => {
  const user = useSession().data?.user

  const useRolesBadges = user?.roles.map(role => {
    return (
      <span
        key={role}
        className="inline-flex mr-1 mb-1 items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
      >
        {role}
      </span>
    )
  })

  return (
    <Fragment>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          <FormattedMessage id={messages.title} />
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          <FormattedMessage id={messages.subTitle} />
        </p>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              <FormattedMessage id={messages.fullName} />
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user?.fullName}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              <FormattedMessage id={messages.email} />
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user?.email}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              <FormattedMessage id={messages.facility} />
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{user?.facility}</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">
              <FormattedMessage id={messages.roles} />
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{useRolesBadges}</span>
            </dd>
          </div>
        </dl>
      </div>
    </Fragment>
  )
}

export default ProfileCardComponent
