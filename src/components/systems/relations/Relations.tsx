import { faker } from '@faker-js/faker'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline'
import useSWR from 'swr'

import { Button, TrashIconButton } from '@/components/ui/Buttons'
import TableComponent from '@/components/ui/Table.comp'

const getDirection = () => {
  var textArray = ['from', 'to']
  var randomNumber = Math.floor(Math.random() * textArray.length)
  return textArray[randomNumber]
}
const getRelation = () => {
  var textArray = ['HAS_SUBSYSTEM', 'IS_SPARE_FOR']
  var randomNumber = Math.floor(Math.random() * textArray.length)
  return textArray[randomNumber]
}

const getFakeRelation = () => {
  return {
    direction: getDirection(),
    relationTypeCode: getRelation(),
    foreignSystemName: faker.company.catchPhrase(),
    relationUid: faker.datatype.uuid(),
  }
}
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const fetchFakeRelations = async () => {
  const res = [...Array(faker.datatype.number({ min: 1, max: 10 }))]
  await sleep(faker.datatype.number({ min: 1000, max: 2000 }))

  return res.map(() => getFakeRelation())
}

const Relations = ({ uid }: { uid: string }) => {
  const { data: relations } = useSWR(uid, fetchFakeRelations)

  const collums = [
    'Direction',
    'Foreign System Name',
    'Relation Type Code',
    'Relation UID',
    'Action',
  ]
  const data = relations?.map((relation, index) => {
    const rows = Object.entries(relation).map((value, index) => {
      if (value[0] === 'direction') {
        return (
          <div key={index}>
            {value[1] === 'to' && <ArrowLongLeftIcon className="w-10 h-10" />}
            {value[1] === 'from' && (
              <ArrowLongRightIcon className="w-10 h-10" />
            )}
          </div>
        )
      }
      return <p key={index}>{value[1]}</p>
    })
    return [
      ...rows,
      <TrashIconButton
        key={index + '1'}
        onClickAction={() => {}}
        rounded="rounded-md"
      />,
    ]
  })
  return (
    <div className="px-3 py-3">
      <Button customClass="mb-2" onClickAction={() => {}} text="Add Spare" />
      {relations && <TableComponent collumsTitle={collums} data={data} />}
    </div>
  )
}

export default Relations
