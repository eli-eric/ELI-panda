import Image from 'next/image'
import eliLogoLight from 'public/eli-logo-small.png'
import eliLogoDark from 'public/eli-logo-small-dark.png'
import { Fragment, startTransition, useEffect, useState } from 'react'

import { useDarkModeStore } from '@/store/useDarkModeStore'

interface Props {
    customClass: string
}

const EliLogoComponent = ({ customClass }: Props) => {
    const { isDark } = useDarkModeStore()
    const [clientSide, setClientSide] = useState(false)

    useEffect(() => {
        // This will be executed only on the client side
        startTransition(() => setClientSide(true))
    }, [])

    // Display nothing or a loader until useEffect runs
    if (!clientSide) return null

    return (
        <Fragment>
            {isDark ? (
                <Image
                    className={customClass}
                    src={eliLogoDark}
                    alt="Eli Logo"
                    width={200}
                    height={200}
                    priority={true}
                />
            ) : (
                <Image
                    className={customClass}
                    src={eliLogoLight}
                    alt="Eli Logo"
                    width={200}
                    height={200}
                    priority={true}
                />
            )}
        </Fragment>
    )
}

export default EliLogoComponent
