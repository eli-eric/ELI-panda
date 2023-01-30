import Card from 'components/systems/Card'
import Link from 'components/systems/Link'
import { SystemProps } from 'types/system'

const SubsystemsList = ({ data }) => (
  <Card>
    <ul>
      {data.children.length === 0 ? (
        <li>This node does not contain any subsystems.</li>
      ) : (
        data.children.map(([uid, name]) => (
          <li key={uid}>
            <Link href={`/tree/${uid}`}>{name}</Link>
          </li>
        ))
      )}
    </ul>
  </Card>
)
const Subsystems = ({ data }: SystemProps) => {
  // Use <details> element on mobile
  return (
    <div>
      <div className="hidden lg:block">
        <b>Subsystems</b>
        <SubsystemsList data={data} />
      </div>
      <details className="lg:hidden max-h-[50vh] overflow-auto">
        <summary>
          <b>Subsystems</b>
        </summary>
        <SubsystemsList data={data} />
      </details>
    </div>
  )
}

export default Subsystems
