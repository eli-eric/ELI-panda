import { ENDPOINTS } from 'core/types/constants/endpoints'
import { SystemTreeItem } from 'core/types/responses'
import { NextPage } from 'next'
import Head from 'next/head'
import { Suspense } from 'react'
import useSWR from 'swr'

type PathStore = { [key: SystemTreeItem['uid']]: SystemTreeItem['path'] }

let getPaths = (stash: PathStore, node: SystemTreeItem): PathStore =>
  node?.children?.reduce(
    (acc, scope) => ({
      ...getPaths(acc, scope),
      [scope.uid]: scope.path
    }),
    stash
  ) ?? stash

let addPaths = (obj, path: SystemTreeItem['path'] = []): SystemTreeItem => ({
  ...obj,
  path,
  children: obj?.children?.map(a => addPaths(a, [...path, obj.uid])) ?? []
})

let openBranch = (node: SystemTreeItem, path: SystemTreeItem['path']): SystemTreeItem => {
  let [current, ...rest] = path
  let { children } = node
  let next = children?.find(a => a.uid === current)
  let others = children?.filter(a => a.uid !== next?.uid) ?? []

  return {
    ...node,
    open: true,
    children: next ? [openBranch(next, rest), ...others] : children
  }
}

let useTree = uid => {
  let tree
  return tree
}

let Node = ({ node }) => (
  <div>
    <div>{node.uid}</div>
    {node.children && node.open && (
      <div className="mx-10">
        {node.children.map(a => (
          <Node node={a} key={a.uid} />
        ))}
      </div>
    )}
  </div>
)

let TreePage: NextPage = () => {
  let { data } = useSWR<Array<SystemTreeItem>>(ENDPOINTS['systemTree'])
  let rootNode = {
    uid: 'root',
    name: 'root',
    systemCode: 'root',
    children: data
  }

  let branch = openBranch(addPaths(rootNode), ['1235', '12349'])

  return (
    <Suspense>
      <Head>
        <title>New tree</title>
      </Head>
      <div className="flex justify-center">
        <Node data={branch} />
      </div>
    </Suspense>
  )
}

export default TreePage
