import { Fragment } from 'react'

import { ModalButtons } from '@/types/form'

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
            type={buttons.goBack?.type}
            onClick={buttons.goBack?.onClick}
            className="inline-flex w-full justify-center sm:mt-0 sm:text-sm text-gray-700"
          >
            {buttons.goBack?.text}
          </Button>
        )}
        <Button
          type={buttons.goNext?.type}
          primary
          onClick={buttons.goNext?.onClick}
          loading={buttons.goNext?.loading}
          className="inline-flex w-full justify-center sm:mt-0 sm:text-sm"
        >
          {buttons.goNext?.text}
        </Button>
      </div>
    )}
  </Fragment>
)

export default ModalButtonsComponent
