import Link from 'next/link'
import { SystemTreeItem } from 'src/types/responses'

interface Props {
  data: SystemTreeItem
}

const TreeBreadcrumpsComponent = ({ data }: Props) => {
  let { path } = data
  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        Systems
        {path.map(([uid, name]) => (
          <div className="flex gap-1 flex-nowrap" key={uid}>
            <div>/</div>
            <Link className="whitespace-nowrap hover:text-orange-700" href={{ query: { slug: [data.uid] } }}>
              {name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TreeBreadcrumpsComponent
