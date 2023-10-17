export const connectN = (uid?: string) => ({
  connect: {
    where: {
      node: {
        uid
      }
    }
  }
})

export const disconnectN = (uid?: string) => ({
  disconnect: {
    where: {
      node: {
        uid
      }
    }
  }
})

export const deleteN = (uid?: string) => ({
  delete: {
    uid
  }
})
