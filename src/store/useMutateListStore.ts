import { createWithEqualityFn as create } from 'zustand/traditional'
type MutateInstance = {
    mutateUrl?: string
}
type MutateState = {
    instances: Record<string, MutateInstance>
    setMutate: (id: string, mutateUrl: string) => void
    reset: (id: string) => void
}

const useMutateListStore = create<MutateState>(set => ({
    instances: {},
    setMutate: (id, mutateUrl) =>
        set(state => {
            const currentInstance = state.instances[id] ?? {}
            const newInstance = { ...currentInstance, mutateUrl }
            return { instances: { ...state.instances, [id]: newInstance } }
        }),

    reset: id =>
        set(state => {
            const newInstances = { ...state.instances }
            delete newInstances[id]
            return { instances: newInstances }
        }),
}))

export default useMutateListStore
