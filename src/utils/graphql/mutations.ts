export const whereN = (uid?: string) => ({
  where: {
    node: {
      uid
    }
  }
})

export const connectN = (uid?: string) => ({
  connect: whereN(uid)
})

export const disconnectN = (uid?: string) => ({
  disconnect: whereN(uid)
})

export const deleteN = (uid?: string) => ({
  delete: whereN(uid)
})
