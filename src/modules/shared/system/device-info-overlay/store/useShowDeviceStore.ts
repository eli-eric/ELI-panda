import { create } from 'zustand'
type ShowDeviceStore = {
  openDeviceInfo: boolean
  setOpenDeviceInfo: (open: boolean) => void
  uid: string | undefined
  code: string | undefined
  setCode: (code: string | undefined) => void
  setUID: (uid: string | undefined) => void
  locationCode: string | undefined
  setLocationCode: (locationCode: string | undefined) => void
}

export const useShowDeviceStore = create<ShowDeviceStore>(set => ({
  openDeviceInfo: false,
  setOpenDeviceInfo: (open: boolean) => set(() => ({ openDeviceInfo: open })),
  code: undefined,
  setCode: (code: string | undefined) =>
    set(() => ({ code, uid: undefined, locationCode: undefined })),
  uid: undefined,
  setUID: (uid: string | undefined) =>
    set(() => ({ uid, code: undefined, locationCode: undefined })),
  locationCode: undefined,
  setLocationCode: (locationCode: string | undefined) =>
    set(() => ({ locationCode, code: undefined, uid: undefined }))
}))
