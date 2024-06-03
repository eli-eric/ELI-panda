import { toast } from 'react-hot-toast'

import axiosInstance from '@/core/axios/axiosInstance'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useQueryManager from '@/hooks/useQueryManager'
import { BASE_URL } from '@/types/constants/common'
import type { SystemDetail, SystemsResponse } from '@/types/responses/systems'

export const addSubsystems = (
  prev: SystemDetail[],
  subsystems: SystemDetail[],
  uid: string | null
): SystemDetail[] => {
  const cloneSystemDetail = (system: SystemDetail): SystemDetail => {
    return {
      ...system,
      subSystems: system.subSystems ? [...system.subSystems] : []
    }
  }

  const cloneAndReplace = (
    data: SystemDetail[],
    uid: string | null
  ): SystemDetail[] => {
    return data.map(item => {
      if (item.uid === uid) {
        // Clone the item and replace subSystems with the new subsystems
        return { ...item, subSystems: subsystems }
      } else if (item.subSystems) {
        // Recursively clone and replace in subSystems
        return { ...item, subSystems: cloneAndReplace(item.subSystems, uid) }
      }
      return cloneSystemDetail(item) // Return a clone of the original item
    })
  }

  // Clone the prev array
  const newData: SystemDetail[] = prev.map(cloneSystemDetail)

  // Recursively clone and replace
  return cloneAndReplace(newData, uid)
}

export const filterSubsystem = (
  uid: string | null,
  prev: SystemsResponse
): SystemsResponse => {
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
  // Deep copy the prev object
  const deepCopyPrev: SystemsResponse = JSON.parse(JSON.stringify(prev))
  // Filter the data in the deep copy
  deepCopyPrev.data = filterData(deepCopyPrev.data)
  return deepCopyPrev
}

export const filterSubsystemFromSubsystems = (
  uid: string | null,
  prev: SystemDetail[]
): SystemDetail[] => {
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
  // Deep copy the prev array
  const deepCopyPrev: SystemDetail[] = JSON.parse(JSON.stringify(prev))
  return filterData(deepCopyPrev)
}

export const updateSystem = (
  uid: string,
  newSystem: SystemDetail,
  prev: SystemsResponse
): SystemsResponse => {
  const cloneSystemDetail = (system: SystemDetail): SystemDetail => {
    return {
      ...system,
      subSystems: system.subSystems ? [...system.subSystems] : []
    }
  }

  const cloneAndUpdate = (data: SystemDetail[]): SystemDetail[] => {
    return data.map(item => {
      if (item.uid === uid) {
        // Clone the item and update with newSystem details
        return {
          ...newSystem,
          hasSubsystems: item.hasSubsystems,
          subSystems: item.subSystems ? [...item.subSystems] : []
        }
      } else if (item.subSystems) {
        // Recursively clone and update in subSystems
        return { ...item, subSystems: cloneAndUpdate(item.subSystems) }
      }
      return cloneSystemDetail(item) // Return a clone of the original item
    })
  }

  // Clone the prev.data array
  const newData: SystemDetail[] = prev.data.map(cloneSystemDetail)

  // Recursively clone and update
  const updatedData = cloneAndUpdate(newData)

  // Return a new SystemsResponse with updated data
  return { ...prev, data: updatedData }
}

export const addSubsystem = (
  parentUid: string,
  newSystem: SystemDetail,
  prev: SystemsResponse
): SystemsResponse => {
  const addData = (data: SystemDetail[]): SystemDetail[] => {
    const result: SystemDetail[] = []
    for (let i = 0; i < data.length; i++) {
      const newItem = { ...data[i] }
      if (newItem.uid === parentUid) {
        newItem.subSystems = newItem.subSystems
          ? [...newItem.subSystems, newSystem]
          : [newSystem]
        newItem.hasSubsystems = true // Ensure hasSubsystems is updated
      } else if (newItem.subSystems) {
        newItem.subSystems = addData(newItem.subSystems)
      }
      result.push(newItem)
    }
    return result
  }
  const newData: SystemDetail[] = prev.data.map(system => ({ ...system }))
  const updatedData = addData(newData)
  const deepCopyPrev = { ...prev, data: [...updatedData] } // Deep copy of prev with updated data
  return deepCopyPrev
}

export const updateSubSystem = (
  prev: SystemDetail[],
  newSystem: SystemDetail
): SystemDetail[] => {
  const cloneSystemDetail = (system: SystemDetail): SystemDetail => {
    return {
      ...system,
      subSystems: system.subSystems ? [...system.subSystems] : []
    }
  }
  const cloneAndUpdate = (data: SystemDetail[]): SystemDetail[] => {
    return data.map(item => {
      if (item.uid === newSystem.uid) {
        // Clone the item and update with newSystem details
        return {
          ...newSystem,
          subSystems: item.subSystems ? [...item.subSystems] : []
        }
      } else if (item.subSystems) {
        // Recursively clone and update in subSystems
        return { ...item, subSystems: cloneAndUpdate(item.subSystems) }
      }
      return cloneSystemDetail(item) // Return a clone of the original item
    })
  }
  // Clone the prev array
  const newData: SystemDetail[] = prev.map(cloneSystemDetail)
  // Recursively clone and update
  return cloneAndUpdate(newData)
}

export const useSystemsRefresh = tableId => {
  const query = useQueryManager(tableId)
  const { systemsList } = useEndpoint({ ...query })

  const systemsRefresh = async (systems: SystemsResponse | undefined) => {
    try {
      const newSystems = await axiosInstance.get(BASE_URL + systemsList)
      const newSubSystems = await Promise.all<SystemDetail[]>(
        newSystems?.data?.data?.map(async system => {
          const newSubSystem = await axiosInstance.get<SystemDetail[]>(
            BASE_URL + '/system/' + system.uid + '/subsystems'
          )
          return { ...system, subSystems: newSubSystem.data }
        })
      )
      return { ...newSystems.data, data: newSubSystems }
    } catch (error) {
      toast.error('Something went wrong while refreshing systems')
      return systems
    }
  }

  return systemsRefresh
}
