import { Fragment } from 'react'

import type { ModalButtons } from '@/types/form'

import { Button } from '../../Buttons'

interface Props {
  testid?: string

  buttons?: ModalButtons
}

const ModalButtonsComponent = ({ testid, buttons }: Props) => (
  <Fragment>
    {buttons && (
      <div className={`mt-5 sm:mt-6 sm:flex sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3`}>
        {buttons.goBack && (
          <Button
            {...buttons.goBack}
            type={buttons.goBack?.type || 'button'}
            testid={`${testid}-${buttons.goBack.testid}`}
            className="inline-flex w-full justify-center sm:mt-0 sm:text-sm text-gray-700 dark:text-gray-200"
          />
        )}
        {buttons.alternative && (
          <Button
            {...buttons.alternative}
            type={buttons.alternative?.type || 'button'}
            testid={`${testid}-${buttons.alternative?.testid}`}
            primary
            className="inline-flex w-full justify-center sm:mt-0 sm:text-sm"
          />
        )}
        <Button
          {...buttons.goNext}
          type={buttons?.goNext?.type || 'button'}
          testid={`${testid}-${buttons.goNext?.testid}`}
          primary
          className="inline-flex w-full justify-center sm:mt-0 sm:text-sm"
        />
      </div>
    )}
  </Fragment>
)

export default ModalButtonsComponent
