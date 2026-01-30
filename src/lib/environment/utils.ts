import { ENV, PROCESS_ENV } from '@/types/constants/common'

export const isProductionEnvironment = () => PROCESS_ENV === ENV.PRODUCTION
export const isDevelopmentEnvironment = () => PROCESS_ENV === ENV.DEV
export const isTestEnvironment = () => PROCESS_ENV === ENV.TEST
export const isLocalEnvironment = () => PROCESS_ENV === ENV.LOCAL

export const shouldShowEnvironmentWarning = () => {
    return !isProductionEnvironment() && !isLocalEnvironment() && typeof window !== 'undefined'
}

export const getEnvironmentColor = () => {
    switch (PROCESS_ENV) {
        case ENV.DEV:
            return {
                bg: 'bg-amber-500/10',
                border: 'border-amber-500/50',
                text: 'text-amber-600 dark:text-amber-400',
                modalBg: 'bg-amber-50 dark:bg-amber-950',
                name: 'DEVELOPMENT',
            }
        case ENV.TEST:
            return {
                bg: 'bg-amber-500/10',
                border: 'border-amber-500/50',
                text: 'text-amber-600 dark:text-amber-400',
                modalBg: 'bg-amber-50 dark:bg-amber-950',
                name: 'TESTING',
            }
        default:
            return {
                bg: '',
                border: '',
                text: '',
                modalBg: '',
                name: 'PRODUCTION',
            }
    }
}

export const getEnvironmentDisplayName = () => {
    return getEnvironmentColor().name
}
