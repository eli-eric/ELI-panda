export const whereN = (uid?: string) => ({
  where: {
    node: {
      uid
    }
  }
})

export const connectN = (uid?: string) => ({
  connect: uid ? whereN(uid) : undefined
})

export const disconnectN = (uid?: string) => ({
  disconnect: whereN(uid)
})

export const deleteN = (uid?: string) => ({
  delete: whereN(uid)
})

export const connectAndDisconnectNode = (uid?: string, disconnectUid?: string) => ({
  connect: uid ? whereN(uid) : undefined,
  disconnect: whereN(disconnectUid)
})
