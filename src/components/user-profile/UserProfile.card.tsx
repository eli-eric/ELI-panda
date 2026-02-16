import { useSession } from 'next-auth/react'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'
import { message } from 'src/i18n/src/messages'

import { Badge } from '@/components/ui/badge'
import { getSwaggerApiDocsUrl } from '@/lib/environment/utils'

const messages = message.layout.profile
const securityMessages = message.profilePage.security

export const UserProfileCard = () => {
    const { formatMessage: fm } = useIntl()
    const user = useSession().data?.user
    const swaggerApiDocsUrl = getSwaggerApiDocsUrl()

    const copyTokenToClipboard = () => {
        navigator.clipboard.writeText(user?.apiAccessToken || '')
        toast.success('Token copied to clipboard')
    }

    return (
        <div>
            <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                        <FormattedMessage id={messages.fullName} />
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                        <span className="grow">{user?.fullName}</span>
                    </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                        <FormattedMessage id={messages.email} />
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                        <span className="grow">{user?.email}</span>
                    </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                        <FormattedMessage id={messages.facility} />
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                        <span className="grow">{user?.facility}</span>
                    </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                        <FormattedMessage id={messages.roles} />
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                        <div className="gap-1 flex overflow-visible  flex-wrap">
                            {user?.roles.map(role => (
                                <Badge key={role}>{role}</Badge>
                            ))}
                        </div>
                    </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                        <FormattedMessage id={securityMessages.apiDocs} />
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                        <span className="grow">
                            <a
                                target="_blank"
                                className="text-orange-600 hover:underline"
                                href={swaggerApiDocsUrl}
                                rel="noreferrer"
                            >
                                {swaggerApiDocsUrl}
                            </a>{' '}
                        </span>
                    </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                        <FormattedMessage id={securityMessages.api} />
                    </dt>
                    <dd className="mt-1 flex text-sm text-gray-900 dark:text-gray-200 sm:col-span-2 sm:mt-0 h-10 ">
                        <div className="overflow-x-auto mr-2">{user?.apiAccessToken}</div>
                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            onClick={copyTokenToClipboard}
                        >
                            {fm({ id: message.common.buttons.copy })}
                        </button>
                    </dd>
                </div>
            </dl>
        </div>
    )
}
