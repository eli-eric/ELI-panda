import { Dispatch, Fragment, SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { ModalButtons } from '@/types/form'

import { Button } from '../Buttons'

const messages = message.common.buttons

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  testid?: string

  buttons?: ModalButtons
}

const GenButton = props => {
  const { type, children, onClick, testId: testid, primary } = props
  return (
    <button
      data-testid={testid + '-modal-button-go-next'}
      className={`inline-flex w-full justify-center rounded-md border border-transparent ${
        primary && 'bg-primary-600'
      } px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm`}
      type={type}
    >
      {children}
    </button>
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

const ModalButtonsComponent = ({ setOpen, testid, buttons }: Props) => {
  return (
    <Fragment>
      {buttons && (
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <Button
            type={buttons.goBack?.type}
            primary
            onClick={buttons.goNext?.onClick}
            loading={buttons.goNext?.loading}
            className="inline-flex w-full justify-center sm:col-start-2 sm:mt-0 sm:text-sm"
          >
            {buttons.goNext?.text}
          </Button>
          <Button
            onClick={buttons.goBack?.onClick}
            className="inline-flex w-full justify-center sm:col-start-1 sm:mt-0 sm:text-sm text-gray-700"
          >
            {buttons.goBack?.text}
          </Button>
        </div>
      )}
      {!buttons && (
        <div className="mt-5 sm:mt-6">
          <button
            data-testid={testid + '-modal-button-close'}
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-sm"
            onClick={() => setOpen(false)}
          >
            <FormattedMessage id={messages.close} />
          </button>
        </div>
      )}
    </Fragment>
  )
}

export default ModalButtonsComponent
