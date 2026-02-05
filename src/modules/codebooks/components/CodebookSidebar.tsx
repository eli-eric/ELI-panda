import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { message } from '@/i18n/src/messages'

import { CodebookSidebarItem } from './CodebookSidebarItem'

interface Props {
    codebooks: { code: string }[]
    selectedCodebook: string | null
    onSelect: (code: string) => void
    isLoading: boolean
}

export const CodebookSidebar = ({ codebooks, selectedCodebook, onSelect, isLoading }: Props) => {
    const { formatMessage: fm } = useIntl()
    const [search, setSearch] = useState('')

    const filteredCodebooks = useMemo(() => {
        if (!search) return codebooks
        return codebooks.filter(c => c.code.toLowerCase().includes(search.toLowerCase()))
    }, [codebooks, search])

    return (
        <div className="flex h-full flex-col border-r">
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={fm({ id: message.codebooksPage.sidebar.searchPlaceholder })}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            <ScrollArea className="flex-1 px-2">
                <div className="space-y-1 pb-4">
                    {isLoading ? (
                        <div className="space-y-2 p-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-9 animate-pulse rounded-md bg-muted" />
                            ))}
                        </div>
                    ) : (
                        filteredCodebooks.map(codebook => (
                            <CodebookSidebarItem
                                key={codebook.code}
                                code={codebook.code}
                                isSelected={selectedCodebook === codebook.code}
                                onClick={() => onSelect(codebook.code)}
                            />
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}
