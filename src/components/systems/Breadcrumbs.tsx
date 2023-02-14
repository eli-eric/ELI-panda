import Link from '@/components/systems/Link'
import { SystemProps } from '@/types/system'

const Breadcrumbs = ({ data }: SystemProps) => {
  const { path } = data
  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        Systems /
        {path.map(([uid, name]) => (
          <Link key={uid} href={`/tree/${uid}`}>
            {name} /
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Breadcrumbs
