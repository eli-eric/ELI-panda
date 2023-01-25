import { message } from 'core/i18n/src/messages'

const messages = message.systemsPage.systemDetail
interface Props {
  children: React.ReactNode
}

const SystemDetailComponent = ({ children }: Props) => {
  return (
    <main className="mx-auto max-w-7xl sm:px-6  lg:px-8 h-full overflow-auto">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="px-4 sm:px-0 lg:mt-0">{children}</div>
      </div>
    </main>
  )
}
export default SystemDetailComponent
