import { toast } from 'react-hot-toast'

import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'

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

export const filterSubsystemFromSubsystems = (uid: string | null, prev: SystemDetail[]): SystemDetail[] => {
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
  return filterData(prev)
}

export const updateSystem = (uid: string, newSystem: SystemDetail, prev: SystemsResponse): SystemsResponse => {
  const updateData = (data: SystemDetail[]): SystemDetail[] => {
    const result: SystemDetail[] = []
    for (let i = 0; i < data.length; i++) {
      let newItem = { ...data[i] }
      if (newItem.uid === uid) {
        newItem = { ...newSystem, hasSubsystems: data[i].hasSubsystems, subSystems: data[i].subSystems }
      } else if (newItem.subSystems) {
        newItem.subSystems = updateData(newItem.subSystems)
      }
      result.push(newItem)
    }
    return result
  }
  return { ...prev, data: updateData(prev.data) }
}

export const addSubsystem = (parentUid: string, newSystem: SystemDetail, prev: SystemsResponse): SystemsResponse => {
  const addData = (data: SystemDetail[]): SystemDetail[] => {
    const result: SystemDetail[] = []
    for (let i = 0; i < data.length; i++) {
      const newItem = { ...data[i] }
      if (newItem.uid === parentUid) {
        newItem.subSystems = newItem.subSystems ? [...newItem.subSystems, newSystem] : [newSystem]
        newItem.hasSubsystems = true // Ensure hasSubsystems is updated
      } else if (newItem.subSystems) {
        newItem.subSystems = addData(newItem.subSystems)
      }
      result.push(newItem)
    }
    return result
  }
  return { ...prev, data: addData(prev.data) }
}

export const systemsRefresh = async (systems: SystemsResponse | undefined) => {
  try {
    const newSystems = await axiosInstance.get(BASE_URL + '/systems' + '?pagination={"page":1,"pageSize":50}')
    const newSubSystems = await Promise.all<SystemDetail[]>(
      newSystems?.data?.data?.map(async system => {
        const newSubSystem = await axiosInstance.get<SystemDetail[]>(BASE_URL + '/system/' + system.uid + '/subsystems')
        return { ...system, subSystems: newSubSystem.data }
      })
    )
    return { ...newSystems.data, data: newSubSystems }
  } catch (error) {
    toast.error('Something went wrong while refreshing systems')
    return systems
  }
}
