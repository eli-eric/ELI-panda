import { useQueryState } from 'next-usequerystate'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookType } from '@/types/responses/codebook'

import { CodebookAddFormContainer } from './components/CodebookAddForm.cont'
import { CodebookDetail } from './components/CodebookDetail'
import { CodebookEmptyState } from './components/CodebookEmptyState'
import { CodebookSidebar } from './components/CodebookSidebar'
import { useCodebookList } from './hooks/useCodebookList'
import { useCodebookValueMutations } from './hooks/useCodebookValueMutations'
import { useCodebookValues } from './hooks/useCodebookValues'

const SIDEBAR_WIDTH = 280

export const CodebooksContainer = () => {
    const { formatMessage: fm } = useIntl()
    const [selectedCodebook, setSelectedCodebook] = useQueryState('selectedCodebook')
    const { openModal, closeModal } = useModalGlobalStore()

    const { data: codebookList, isLoading: isLoadingList } = useCodebookList()
    const {
        data: values,
        isLoading: isLoadingValues,
        queryKey,
    } = useCodebookValues(selectedCodebook as CODEBOOK)

    const mutations = useCodebookValueMutations({
        codebookType: selectedCodebook as CODEBOOK,
        queryKey,
    })

    const withWarningModal = useWarningModal()

    const handleSelect = useCallback(
        (code: string) => {
            setSelectedCodebook(code)
        },
        [setSelectedCodebook],
    )

    const handleAdd = useCallback(() => {
        if (!selectedCodebook) return

        openModal('dialog1', {
            component: CodebookAddFormContainer,
            props: {
                title: fm({ id: message.codebooksPage.addForm.title }),
                codebookType: selectedCodebook as CODEBOOK,
                queryKey,
                onSuccess: () => closeModal('dialog1'),
                onCancel: () => closeModal('dialog1'),
            },
        })
    }, [selectedCodebook, queryKey, openModal, closeModal, fm])

    const handleUpdate = useCallback(
        async (uid: string, name: string) => {
            await mutations.update({ uid, name })
        },
        [mutations],
    )

    const handleDelete = useCallback(
        (value: CodebookType) => {
            withWarningModal(
                () => mutations.delete(value.uid),
                fm({ id: message.codebooksPage.deleteConfirm }, { name: value.name }),
            )()
        },
        [withWarningModal, mutations, fm],
    )

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            <div style={{ width: SIDEBAR_WIDTH }} className="flex-shrink-0">
                <CodebookSidebar
                    codebooks={codebookList ?? []}
                    selectedCodebook={selectedCodebook}
                    onSelect={handleSelect}
                    isLoading={isLoadingList}
                />
            </div>

            <div className="flex-1 overflow-auto">
                {selectedCodebook ? (
                    <CodebookDetail
                        codebookCode={selectedCodebook}
                        data={values?.data ?? []}
                        isLoading={isLoadingValues}
                        onAdd={handleAdd}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ) : (
                    <CodebookEmptyState />
                )}
            </div>
        </div>
    )
}
