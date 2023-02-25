import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Dispatch, SetStateAction, useMemo } from 'react'

import { Button } from '@/components/ui/Buttons'
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
        selectSystemUid({ uid, name })
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
  setSelectedSystem,
  selectedSystem,
}: {
  systems: SystemForRel[] | undefined
  setSelectedSystem: Dispatch<
    SetStateAction<
      | {
          name: string
          uid: string
        }
      | undefined
    >
  >
  selectedSystem:
    | {
        name: string
        uid: string
      }
    | undefined
}): JSX.Element[][] | undefined => {
  const data = useMemo(() => {
    const data = systems?.map(system => {
      const row = Object.entries(system).filter(
        system =>
          system[0].includes('name') ||
          system[0].includes('systemCodePath') ||
          system[0].includes('systemType'),
      )
      return row.map(([key, value], index) => {
        if (value) {
          if (key === 'name') {
            return (
              <Name
                key={system.uid + index}
                name={system.name}
                selectSystemUid={setSelectedSystem}
                uid={system.uid}
                selelectedSystem={selectedSystem?.uid}
              />
            )
          }
        }
        return <p key={system.name + index}>{value}</p>
      })
    })
    return data
  }, [systems, selectedSystem, setSelectedSystem])

  return data
}

export const useRelationMapRows = ({
  relations,
  onDelete,
}: {
  relations: SystemRelationshipResponse[] | undefined
  onDelete: (uid: string) => void
}): JSX.Element[][] | undefined => {
  const data = useMemo(
    () =>
      relations?.map((relation, index) => {
        const rows = Object.entries(relation).map(([key, value], index) => {
          if (key === 'direction') {
            return (
              <div key={index}>
                {value === 'to' && <ArrowLongLeftIcon className="w-10 h-10" />}
                {value === 'from' && (
                  <ArrowLongRightIcon className="w-10 h-10" />
                )}
              </div>
            )
          }

          return <p key={index}>{value}</p>
        })

        return [
          ...rows,
          <Button
            key={index + '1'}
            onClick={() => onDelete(relation.relationUid)}
            rounded="rounded-md"
          >
            {' '}
            <TrashIcon
              className="h-5 w-5 text-red-700"
              aria-hidden="true"
            />{' '}
          </Button>,
        ]
      }),
    [onDelete, relations],
  )

  return data
}
