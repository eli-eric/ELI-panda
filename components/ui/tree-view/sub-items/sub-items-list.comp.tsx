import { SystemTreeItem } from 'types/responses'
import Link from 'next/link'

import Card from '../../card/card.comp'

interface Props {
  data: SystemTreeItem
}

const SubItemsList = ({ data }: Props) => {
  return (
    <Card>
      <ul>
        {!data.children || data.children.length === 0 ? (
          <li>This node does not contain any subsystems.</li>
        ) : (
          data.children.map(({ uid, name }) => (
            <li key={uid}>
              <Link className="hover:text-orange-700" href={{ query: { slug: [data.uid] } }}>
                {name}
              </Link>
            </li>
          ))
        )}
      </ul>
    </Card>
  )
}

export default SubItemsList
