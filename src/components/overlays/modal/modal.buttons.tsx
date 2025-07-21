import { Fragment } from 'react'

import { cn } from '@/lib/utils'
import type { ModalButtons } from '@/types/form'

import { Button } from '../../Buttons'

interface Props {
  testid?: string
  buttons?: ModalButtons
  className?: string
}

const ModalButtonsComponent = ({ testid, buttons, className }: Props) => (
  <Fragment>
    {buttons && (
      <div
        className={cn(
          `mt-5 sm:mt-6 sm:flex sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3`,
          className
        )}
      >
        {buttons.goBack && !buttons.goBack.hidden && (
          <Button
            {...buttons.goBack}
            type={buttons.goBack?.type || 'button'}
            testid={`${testid}-${buttons.goBack.testid}`}
            className="inline-flex w-full justify-center sm:mt-0 sm:text-sm text-gray-700 dark:text-gray-200"
          />
        )}
        {buttons.alternative && !buttons.alternative.hidden && (
          <Button
            {...buttons.alternative}
            type={buttons.alternative?.type || 'button'}
            testid={`${testid}-${buttons.alternative?.testid}`}
            className="inline-flex w-full justify-center sm:mt-0 sm:text-sm"
          />
        )}
        {!buttons.goNext?.hidden && (
          <Button
            {...buttons.goNext}
            type={buttons?.goNext?.type || 'button'}
            testid={`${testid}-${buttons.goNext?.testid}`}
            className="inline-flex w-full justify-center sm:mt-0 sm:text-sm"
          />
        )}
      </div>
    )}
  </Fragment>
)

export default ModalButtonsComponent
