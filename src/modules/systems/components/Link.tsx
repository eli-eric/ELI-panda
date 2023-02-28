import Link from 'next/link'

const SystemLink = props => (
  <Link
    {...props}
    className={`whitespace-nowrap hover:text-orange-700 ${props.className}`}
  />
)

export default SystemLink
