import Card from 'components/systems/Card'
import Link from 'components/systems/Link'

const Subsystems = ({ data }) => (
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

export default Subsystems
