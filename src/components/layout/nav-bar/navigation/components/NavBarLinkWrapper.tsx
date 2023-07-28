import classNames from 'classnames'
import { useRouter } from 'next/router'

interface NavBarLinkWrapperProps {
  children: React.ReactNode
  href?: string
  className?: string
  open?: boolean
}
export const NavBarLinkWrapper = ({ children, href, className, open }: NavBarLinkWrapperProps) => {
  const router = useRouter()
  return (
    <div
      className={classNames(
        open
          ? 'block w-full text-left border-l-4 py-2 pl-3 pr-4 text-base hover:bg-gray-50'
          : 'inline-flex items-center border-b-2 px-1 pt-1 text-sm',
        'font-medium h-full',
        href && router.asPath.startsWith(href)
          ? 'text-gray-900 border-primary-500'
          : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent',
        className
      )}
    >
      {children}
    </div>
  )
}
