import type { SystemDetail, SystemsResponse } from '../types/responses'

export const makeSubsystems = (
  uid: string | null,
  prev: SystemsResponse,
  subsystems: SystemDetail[]
): SystemsResponse => {
  const newData = [...prev.data]
  const findAndReplace = (data, uid, newData) => {
    data.forEach((item, index) => {
      if (item.uid === uid) {
        newData[index].subSystems = subsystems
      } else if (item.subSystems) {
        findAndReplace(item.subSystems, uid, newData[index].subSystems)
      }
    })
  }
  findAndReplace(prev.data, uid, newData)
  return { ...prev, data: newData }
}

export const filterSubsystem = (uid: string | null, prev: SystemsResponse): SystemsResponse => {
  const filterData = (data: SystemDetail[]): SystemDetail[] => {
    const result: SystemDetail[] = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].uid !== uid) {
        const newItem = { ...data[i] }
        if (newItem.subSystems) {
          newItem.subSystems = filterData(newItem.subSystems)
        }
        result.push(newItem)
      }
    }
    return result
  }
  return { ...prev, data: filterData(prev.data) }
}
