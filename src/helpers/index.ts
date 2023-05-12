import { twMerge } from 'tailwind-merge'

export function classNames(...classes) {
  return twMerge(classes.filter(Boolean).join(' '))
}
