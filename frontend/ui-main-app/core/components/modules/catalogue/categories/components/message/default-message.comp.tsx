interface Props {
  title?: string
  message: string
}

const DefaultMessageComponent = ({ title, message }: Props) => {
  return (
    <div className="text-center align-middle">
      {title && <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>}
      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>
  )
}

export default DefaultMessageComponent
