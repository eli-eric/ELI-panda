import { createWithEqualityFn as create } from 'zustand/traditional'

export type WarningModalParams = {
    isOpen: boolean
    isConfirmed: boolean
    error: string
    message: string
}

const initialParams: WarningModalParams = {
    isOpen: false,
    isConfirmed: false,
    error: '',
    message: '',
}

type PendingExecution = {
    callback: Function
    callbackArgs: any[]
    id: string
}

type WarningModalStore = {
    params: WarningModalParams
    pendingExecution?: PendingExecution
    executionHistory: Set<string>

    // Modal actions
    openModal: (message: string, callback: Function, callbackArgs?: any[]) => void
    closeModal: () => void
    confirmModal: () => void

    // Execution management
    executeCallback: () => void
    clearExecution: () => void

    // Internal state management
    patchParams: (params: Partial<WarningModalParams>) => void
    resetParams: () => void
}

export const useWarningModalStore = create<WarningModalStore>((set, get) => ({
    params: initialParams,
    pendingExecution: undefined,
    executionHistory: new Set(),

    openModal: (message: string, callback: Function, callbackArgs: any[] = []) => {
        const executionId = Date.now() + '_' + Math.random().toString(36).substr(2, 9)

        set({
            params: {
                isOpen: true,
                isConfirmed: false,
                error: '',
                message,
            },
            pendingExecution: {
                callback,
                callbackArgs,
                id: executionId,
            },
        })
    },

    closeModal: () => {
        set({
            params: initialParams,
            pendingExecution: undefined,
        })
    },

    confirmModal: () => {
        const state = get()
        if (state.pendingExecution && !state.executionHistory.has(state.pendingExecution.id)) {
            // Mark as confirmed and execute immediately
            set(currentState => ({
                params: { ...currentState.params, isConfirmed: true, isOpen: false },
                executionHistory: new Set([
                    ...currentState.executionHistory,
                    state.pendingExecution!.id,
                ]),
            }))

            // Execute callback synchronously
            try {
                state.pendingExecution.callback(...state.pendingExecution.callbackArgs)
            } catch (err) {
                set(currentState => ({
                    params: { ...currentState.params, error: String(err) },
                }))
            }

            // Clean up execution state
            setTimeout(() => {
                get().clearExecution()
            }, 100)
        }
    },

    executeCallback: () => {
        // This method is now handled in confirmModal for immediate execution
        //eslint-disable-next-line no-console
        console.log('executeCallback called - handled in confirmModal')
    },

    clearExecution: () => {
        set({
            pendingExecution: undefined,
            params: initialParams,
        })
    },

    patchParams: (newParams: Partial<WarningModalParams>) => {
        set(state => ({
            params: { ...state.params, ...newParams },
        }))
    },

    resetParams: () => {
        set({ params: initialParams })
    },
}))
