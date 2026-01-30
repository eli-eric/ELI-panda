import { useQuery } from '@tanstack/react-query'
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import CheckBox from '@/components/form/CheckBox'
import { queryFetcher } from '@/utils/fetcher'

import type { SystemGraphResponse } from './types'

interface Props {
    uid: string
    setData: Dispatch<SetStateAction<SystemGraphResponse | undefined>>
    relationships?: string[]
}

export const NodeFilters: FC<Props> = ({ uid, setData, relationships }) => {
    const { data } = useQuery({
        queryKey: ['systemGraph', { uid }],
        queryFn: queryFetcher<SystemGraphResponse>('generalGraph'),
    })

    const { control } = useFormContext()

    const filter = useWatch({
        control: control,
        name: 'relationships',
    })

    useEffect(() => {
        if (data) {
            const filteredLinks = data.links.filter(link => filter && filter[link.relationship])
            setData({
                nodes: data.nodes.filter(node =>
                    filteredLinks.some(
                        link => link.source === node.uid || link.target === node.uid,
                    ),
                ),

                links: filteredLinks,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    return (
        <div className="flex flex-col h-full border rounded-md pr-4 pl-4 pt-4 gap-y-1">
            {relationships?.map(relationship => (
                <CheckBox
                    key={relationship}
                    label={relationship}
                    name={`relationships.${relationship}`}
                />
            ))}
        </div>
    )
}
