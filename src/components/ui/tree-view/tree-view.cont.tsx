import React from 'react'

import { SystemTreeItem } from '@/types/responses'

import TreeBreadcrumpsComponent from './breadcrumb/breadcrumps.comp'
import SubItems from './sub-items/sub-items.comp'

interface Props {
  data: SystemTreeItem
  children: React.ReactNode
}

const TreeViewComponent = ({ data, children }: Props) => {
  return (
    <div className="p-2 lg:p-4 flex flex-wrap">
      <nav className="p-1 lg:p2 w-full">
        <TreeBreadcrumpsComponent data={data} />
      </nav>
      <aside className="p-1 lg:p-2 w-full lg:w-1/4">
        <nav>
          <SubItems data={data} />
        </nav>
      </aside>
      <main className="p-1 lg:p-2 lg:w-3/4">
        <article>{children}</article>
      </main>
    </div>
  )
}

export default TreeViewComponent
