import Link from 'next/link'
import { type FC, type PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'
import type { ROLE } from '@/types/constants/roles'

import { AccessControl } from '../auth/AccesControl'
import { Card, CardHeader, CardTitle } from '../ui/card'

interface CardProps {
  name: string
  link?: string
  Icon: () => JSX.Element
  legacyBehavior?: boolean
  role: ROLE
}

export const Tile = ({ name, link, Icon, legacyBehavior, role }: CardProps) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <Card
      className={cn(
        'group cursor-pointer transition-all duration-300 ease-out hover:shadow-md',
        'hover:border-border hover:bg-accent/5 border-border',
        'min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex flex-col'
      )}
      data-testid={`tile-${name}`}
    >
      {children}
    </Card>
  )

  const cardContent = (
    <>
      <CardHeader className="flex-1 flex flex-col items-center justify-center text-center px-2 py-3 sm:px-3 sm:py-4 md:px-4 md:py-6">
        <div className="mb-2 sm:mb-3 md:mb-4 text-primary transition-colors group-hover:text-primary/80">
          <Icon />
        </div>
        <CardTitle className="text-xs sm:text-sm md:text-base font-semibold text-foreground group-hover:text-primary leading-tight">
          {name}
        </CardTitle>
      </CardHeader>
    </>
  )

  return (
    <AccessControl roles={role}>
      {link ? (
        <Link
          href={link}
          legacyBehavior={legacyBehavior}
          target={legacyBehavior ? '_blank' : undefined}
          className="block"
        >
          <CardWrapper>{cardContent}</CardWrapper>
        </Link>
      ) : (
        <CardWrapper>{cardContent}</CardWrapper>
      )}
    </AccessControl>
  )
}

export const TileContainer: FC<PropsWithChildren> = ({ children }) => (
  <div
    data-testid="tile-container"
    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6"
  >
    {children}
  </div>
)
