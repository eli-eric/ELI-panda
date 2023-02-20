import { Fragment } from 'react'

interface Props {
  name: string
  description?: string
}

const SystemDetailHeaderComponent = ({ name, description }: Props) => {
  return (
    <Fragment>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {name}
      </h1>
      <h3 className="sr-only">Description</h3>
      <div
        className="space-y-6 text-base text-gray-700"
        dangerouslySetInnerHTML={{
          __html:
            description === '' ||
            description === null ||
            description === undefined
              ? 'No description'
              : description,
        }}
      />
    </Fragment>
  )
}

export default SystemDetailHeaderComponent
