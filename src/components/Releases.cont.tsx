import Link from 'next/link'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

interface RelaseVersion {
    id: string
    bugs?: RelaseNote[]
    features?: RelaseNote[]
}

interface RelaseNote {
    description: string
    link?: string
}

const releases: Array<RelaseVersion> = [
    /* {
    id: '0.0.2',
    features: [
      {
        description:
          'Catalogue categories: you can now edit(create, update, delete) categories, property groups and properties',
        link: '/catalogue'
      },
      {
        description: 'Systems: first draft of the System overview',
        link: '/systems'
      },
      {
        description: 'Systems - relationships: you can see all the relationships for the selected System',
        link: '/systems'
      }
    ],
    bugs: [
      {
        description: 'Logout - show loading indicator during the logout'
      }
    ]
  },
  {
    id: '0.0.1',
    features: [
      {
        description: 'Catalogue page: searching items via search bar - text box in the header of the page',
        link: '/catalogue'
      },
      {
        description: 'Catalogue page: filter by categories - categories tiles',
        link: '/catalogue'
      },
      {
        description: 'Catalogue page: item detail page',
        link: '/catalogue'
      }
    ],
    bugs: [
      {
        description:
          'Loading indicator - show loading indicator during the start, if there is a slow network connection'
      }
    ]
  } */
]

export const ReleasesContainer = () => {
    const { formatMessage: fm } = useIntl()
    const BRACKET_OPEN = '['
    const BRACKET_CLOSE = ']'

    return (
        <ul role="list" className=" font-mono">
            {releases.map((item, idx) => (
                <li key={idx} className="px-2 py-2 sm:px-4 sm:py-4 shadow-lg my-5 mx-2">
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">
                        {fm({ id: message.common.ui.version })} {item.id}{' '}
                        {idx === 0 && fm({ id: message.common.ui.latestVersion })}
                    </h3>
                    <div className="p-2">
                        {item.bugs && (
                            <>
                                <div className="text-lg text-red-500">
                                    {fm({ id: message.common.ui.fixedBugs })}
                                </div>
                                <ul className="p-1">
                                    {item.bugs.map(bug => (
                                        <li className="list-disc ml-3 mb-2" key={bug.description}>
                                            {bug.description}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {item.features && (
                            <>
                                <div className="text-lg text-green-600">
                                    {fm({ id: message.common.ui.newFeatures })}
                                </div>
                                <ul className="p-1">
                                    {item.features.map(feature => (
                                        <li
                                            className="list-disc ml-3 mb-2"
                                            key={feature.description}
                                        >
                                            {feature.description}{' '}
                                            {feature.link && (
                                                <span>
                                                    {BRACKET_OPEN}
                                                    <Link
                                                        className="text-sky-600"
                                                        href={feature.link}
                                                        target="_blank"
                                                    >
                                                        {feature.link}
                                                    </Link>
                                                    {BRACKET_CLOSE}
                                                </span>
                                            )}{' '}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}
