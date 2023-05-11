import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import type { ModalButtons } from '@/types/form'

import { Button } from '../Buttons'

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
            testid={`${testid}-${buttons.goBack.testid}`}
            type={buttons.goBack?.type}
            onClick={buttons.goBack?.onClick}
            className="inline-flex w-full justify-center sm:mt-0 sm:text-sm text-gray-700"
          >
            <FormattedMessage id={buttons.goBack?.text} />
          </Button>
        )}
        <Button
          testid={`${testid}-${buttons.goNext?.testid}`}
          type={buttons.goNext?.type}
          primary
          onClick={buttons.goNext?.onClick}
          loading={buttons.goNext?.loading}
          className="inline-flex w-full justify-center sm:mt-0 sm:text-sm"
        >
          <FormattedMessage id={buttons.goNext?.text} />
        </Button>
      </div>
    )}
  </Fragment>
)

export default ModalButtonsComponent
