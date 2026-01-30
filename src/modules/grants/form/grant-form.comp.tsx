import type { FC } from 'react'

import Combobox from '@/components/form/Combobox'
import { Input } from '@/components/form/inputs'
import { CODEBOOK } from '@/types/constants/codebook'

interface Props {
    disabled?: boolean
}

export const GrantFormFields: FC<Props> = ({ disabled = false }) => {
    return (
        <div className="flex flex-col gap-4 py-4">
            <Input
                name="code"
                label="Code"
                placeholder="Enter grant code"
                disabled={disabled}
                required
            />

            <Input
                name="name"
                label="Name"
                placeholder="Enter grant name"
                disabled={disabled}
                required
            />

            <Combobox
                name="grantGroup"
                label="Grant Group"
                codebook={CODEBOOK.GRANT_GROUP}
                placeholder="Select grant group"
                disabled={disabled}
            />
        </div>
    )
}
