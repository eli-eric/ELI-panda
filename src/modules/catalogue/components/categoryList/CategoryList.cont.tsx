import { Disclosure } from '@/components/ui'
import type { CodebookType } from '@/types/responses/codebook'

import { CategoryList } from './CategoryList.comp'

interface Props {
  onChange: (open: boolean) => void
  setCategoryFilter: (value: CodebookType) => void
}

export const CategoryListContainer = ({
  onChange,
  setCategoryFilter
}: Props) => (
  <div id="category-list">
    <Disclosure
      title="Categories"
      onChange={onChange}
      className="flex flex-col"
      panelClassName="grid"
    >
      <CategoryList setCategoryFilter={setCategoryFilter} />
    </Disclosure>
  </div>
)
