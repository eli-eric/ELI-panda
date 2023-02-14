import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'

import DisclosureComponent from '@/components/ui/Disclosure.comp'
import { TrashIconButton } from '@/components/ui/IconButtons'
import TableComponent from '@/components/ui/Table.comp'

const relations = [
  { direction: 'from', relation: 'HAS_SUBSYSTEM', name: 'Blada bla' },
  { direction: 'to', relation: 'IS_SPARE_FOR', name: 'Blad gbla' },
  { direction: 'to', relation: 'HAS_SUBSYSTEM', name: 'Blad bla' },
  { direction: 'to', relation: 'IS_SPARE_FOR', name: 'Bla fbla' },
  { direction: 'from', relation: 'IS_SPARE_FOR', name: 'Bla gbla' }

  // More relations...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Table() {
  const collums = Object.keys(relations[0])
  const data = relations.map((relation, index) => {
    const rows = Object.entries(relation).map((value, index) => {
      if (value[0] === 'direction') {
        return (
          <div key={index}>
            {value[1] === 'to' && <ArrowLongLeftIcon className="w-10 h-10" />}
            {value[1] === 'from' && <ArrowLongRightIcon className="w-10 h-10" />}
          </div>
        )
      }
      return <p key={index}>{value[1]}</p>
    })
    return [...rows, <TrashIconButton key={index + '1'} onClickAction={() => {}} rounded="rounded-md" />]
  })

  return (
    <div className="px-4 sm:px-20 lg:px-20">
      <div className="sm:flex sm:items-center">
        <div className="mt-4 sm:mt-0  sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Spare
          </button>
        </div>
      </div>

      <div className="border rounded-md">
        <TableComponent collumsTitle={[...collums, 'action']} tableRows={data} />
      </div>
    </div>
  )
}

const RelationList = () => {
  return (
    <DisclosureComponent title="Relations">
      <Table />
    </DisclosureComponent>
  )
}

export default RelationList
