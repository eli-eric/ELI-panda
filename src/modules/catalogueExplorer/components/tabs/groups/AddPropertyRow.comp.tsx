import { Plus } from 'lucide-react'
import type { FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

interface AddPropertyRowProps {
    onAdd: (body: { name: string; type: { uid: string; name?: string } }) => Promise<unknown>
    isPending: boolean
}

export const AddPropertyRow: FC<AddPropertyRowProps> = ({ onAdd, isPending }) => {
    const { formatMessage: fm } = useIntl()
    const [name, setName] = useState('')
    const [type, setType] = useState<{ uid: string; name: string } | null>(null)
    const [typeOpen, setTypeOpen] = useState(false)
    const { data: typeOptions } = useCodebook(CODEBOOK.CATALOGUE_PROPERTY_TYPE)

    const reset = () => {
        setName('')
        setType(null)
    }

    const isValid = name.trim().length > 0 && !!type

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isValid || !type) return
        await onAdd({ name: name.trim(), type: { uid: type.uid, name: type.name } })
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border border-dashed border-border rounded-md p-2"
        >
            <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={fm({ id: message.catalogue.category.newPropertyPlaceholder })}
                className="h-8 text-sm flex-1"
                disabled={isPending}
            />
            <Popover open={typeOpen} onOpenChange={setTypeOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="min-w-[7rem] justify-start"
                        disabled={isPending}
                    >
                        {type?.name ?? fm({ id: message.catalogue.category.selectType })}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder={fm({ id: message.catalogue.category.selectType })} />
                        <CommandList>
                            <CommandEmpty>—</CommandEmpty>
                            <CommandGroup>
                                {(typeOptions?.data ?? []).map(o => (
                                    <CommandItem
                                        key={o.uid}
                                        value={o.name}
                                        onSelect={() => {
                                            setType({ uid: o.uid, name: o.name })
                                            setTypeOpen(false)
                                        }}
                                    >
                                        {o.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button type="submit" size="sm" disabled={!isValid || isPending}>
                <Plus className="size-3.5" />
                {fm({ id: message.catalogue.category.addProperty })}
            </Button>
        </form>
    )
}
