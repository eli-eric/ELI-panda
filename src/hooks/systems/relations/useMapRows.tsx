import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Dispatch, SetStateAction, useMemo } from 'react'

import { TrashIconButton } from '@/components/ui/Buttons'
import { SystemRelationshipResponse } from '@/types/responses'
import { SystemForRel } from '@/types/system'

const Name = ({ uid, name, selectSystemUid, selelectedSystem }) => {
  const image = 'https://source.unsplash.com/collection/71371194/500x500'
  return (
    <div
      className={`flex items-center cursor-pointer ${
        uid === selelectedSystem ? 'text-primary-600' : ''
      }`}
      onClick={() => {
        selectSystemUid(uid)
      }}
    >
      <div className="h-10 w-10 flex-shrink-0">
        <Image
          className="h-10 w-10 rounded-full"
          alt={name}
          src={image}
          width={200}
          height={200}
        />
      </div>
      <div className="ml-4">{name}</div>
    </div>
  )
}

export const useSystemMapRows = ({
  systems,
  setSelectedSystemUid,
  selectedSystemUid
}: {
  systems: SystemForRel[] | undefined
  setSelectedSystemUid: Dispatch<SetStateAction<string | undefined>>
  selectedSystemUid: string | undefined
}): JSX.Element[][] | undefined => {
  const data = useMemo(() => {
    const data = systems?.map(system => {
      const row = Object.entries(system).filter(
        system =>
          system[0].includes('name') ||
          system[0].includes('systemCodePath') ||
          system[0].includes('systemType')
      )
      return row.map((value, index) => {
        if (value) {
          if (value[0] === 'name') {
            return (
              <Name
                key={system.uid + index}
                name={system.name}
                selectSystemUid={setSelectedSystemUid}
                uid={system.uid}
                selelectedSystem={selectedSystemUid}
              />
            )
          }
        }
        return <p key={system.name + index}>{value[1]}</p>
      })
    })
    return data
  }, [systems, selectedSystemUid, setSelectedSystemUid])

  return data
}

export const useRelationMapRows = ({
  relations,
  onDelete
}: {
  relations: SystemRelationshipResponse[] | undefined
  onDelete: (uid: any) => void
}): JSX.Element[][] | undefined => {
  const data = useMemo(
    () =>
      relations?.map((relation, index) => {
        const rows = Object.entries(relation).map((value, index) => {
          if (value[0] === 'direction') {
            return (
              <div key={index}>
                {value[1] === 'to' && (
                  <ArrowLongLeftIcon className="w-10 h-10" />
                )}
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
            onClickAction={() => {
              onDelete(relation.relationUid)
            }}
            rounded="rounded-md"
          />
        ]
      }),
    [onDelete, relations]
  )

  return data
}
