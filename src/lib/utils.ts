import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function truncateString(str?: string, length = 30) {
    if (!str) {
        return ''
    }
    if (str.length > length) {
        return str.slice(0, length) + '...'
    } else {
        return str
    }
}
