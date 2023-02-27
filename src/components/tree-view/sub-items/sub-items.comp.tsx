import { SystemTreeItem } from '@/types/responses'

import SubItemsList from './sub-items-list.comp'

interface Props {
  data: SystemTreeItem
}

const SubItems = ({ data }: Props) => (
  <div>
    <div className="hidden lg:block">
      <b>Subsystems</b>
      <SubItemsList data={data} />
    </div>
    <details className="lg:hidden max-h-[50vh] overflow-auto">
      <summary>
        <b>Subsystems</b>
      </summary>
      <SubItemsList data={data} />
    </details>
  </div>
)

export default SubItems
