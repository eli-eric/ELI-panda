import type { FC } from 'react'

import type { GraphNode } from './types'

interface Props {
  node: GraphNode
}

export const NodeDetails: FC<Props> = ({ node }) => {
  const keys = Object.keys(node.properties)

  if (keys.length) {
    return (
      <div className="h-full col-span-5 border rounded-md pr-4 pl-4">
        {keys.map(key => (
          <div key={key}>
            <span className="">{key}: </span>
            <span>{node.properties[key]}</span>
          </div>
        ))}
      </div>
    )
  }
  return <div></div>
}
