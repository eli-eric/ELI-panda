import { useSession } from 'next-auth/react'
import { FormattedMessage } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { Badge } from '@/components/visuals/Badge'

const messages = message.layout.profile

export const UserProfileCard = () => {
  const user = useSession().data?.user

  return (
    <div>
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
            <span className="flex-grow">{user?.roles.map(role => <Badge key={role}>{role}</Badge>)}</span>
          </dd>
        </div>
      </dl>
    </div>
  )
}
