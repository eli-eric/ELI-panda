import { create } from 'zustand'
type ShowDeviceStore = {
  openDeviceInfo: boolean
  setOpenDeviceInfo: (open: boolean) => void
  uid: string | undefined
  setUID: (uid: string | undefined) => void
}

export const useShowDeviceStore = create<ShowDeviceStore>(set => ({
  openDeviceInfo: false,
  setOpenDeviceInfo: (open: boolean) => set(() => ({ openDeviceInfo: open })),
  uid: undefined,
  setUID: (uid: string | undefined) => set(() => ({ uid }))
}))
