import * as React from 'react'

const LG_BREAKPOINT = 1024

export function useIsLargeScreen() {
    const [isLargeScreen, setIsLargeScreen] = React.useState(
        typeof window !== 'undefined' ? window.innerWidth >= LG_BREAKPOINT : false,
    )

    React.useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`)
        const onChange = () => {
            setIsLargeScreen(window.innerWidth >= LG_BREAKPOINT)
        }
        mql.addEventListener('change', onChange)
        setIsLargeScreen(window.innerWidth >= LG_BREAKPOINT)
        return () => mql.removeEventListener('change', onChange)
    }, [])

    return !!isLargeScreen
}
