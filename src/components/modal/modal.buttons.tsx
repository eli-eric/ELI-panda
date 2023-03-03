import { Fragment } from 'react'
import { message } from 'src/i18n/src/messages'

import { ModalButtons } from '@/types/form'

import { Button } from '../Buttons'

const messages = message.common.buttons

const GenButton = props => {
  const { type, children, onClick, testId: testid, primary } = props
  return (
    <Button
      className="inline-flex w-full justify-center sm:col-start-2 sm:mt-0 sm:text-sm"
      data-testid={testid + '-modal-button-go-next'}
      onClick={onClick}
      primary={primary}
      type={type}
    >
      {children}
    </Button>
  )
}

export const GenericButtons = ({ buttons }: { buttons: any[] }) => (
  <div className="mt-5 flex flex-row gap-x-5">
    {buttons.map(({ type, value, onClick, testId, primary }, idx) => (
      <GenButton
        key={idx}
        testId={testId}
        type={type}
        onClick={onClick}
        primary={primary}
      >
        {value}
      </GenButton>
    ))}
  </div>
)

interface Props {
  testid?: string

  buttons?: ModalButtons
}

const ModalButtonsComponent = ({ testid, buttons }: Props) => (
  <Fragment>
    {buttons && (
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <Button
          type={buttons.goNext?.type}
          primary
          onClick={buttons.goNext?.onClick}
          loading={buttons.goNext?.loading}
          className="inline-flex w-full justify-center sm:col-start-2 sm:mt-0 sm:text-sm"
        >
          {buttons.goNext?.text}
        </Button>
        <Button
          type={buttons.goBack?.type}
          onClick={buttons.goBack?.onClick}
          className="inline-flex w-full justify-center sm:col-start-1 sm:mt-0 sm:text-sm text-gray-700"
        >
          {buttons.goBack?.text}
        </Button>
      </div>
    )}
  </Fragment>
)

export default ModalButtonsComponent
