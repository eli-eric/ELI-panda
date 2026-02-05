import Link from 'next/link'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { BackButton, Button } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import type { ROLE } from '@/types/constants/roles'

type Props = {
    onSubmitAndExit?: () => void
    onSubmit: () => void
    role: ROLE
    exitTo: string
}

export const PageHeaderButtons = ({ onSubmitAndExit, onSubmit, role, exitTo }: Props) => {
    const editPersmission = usePermission([role])
    const { formatMessage: fm } = useIntl()

    return (
        <div className="flex space-x-2">
            {editPersmission && (
                <Fragment>
                    <Button type="button" onClick={onSubmit}>
                        {fm({ id: message.common.buttons.save })}
                    </Button>
                    {onSubmitAndExit && (
                        <Button type="button" onClick={onSubmitAndExit}>
                            {fm({ id: message.common.buttons.saveAndExit })}
                        </Button>
                    )}
                </Fragment>
            )}
            <Link href={exitTo}>
                <BackButton />
            </Link>
        </div>
    )
}
