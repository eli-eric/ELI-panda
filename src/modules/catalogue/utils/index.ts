import type { CategoryFormType } from '../components/categoryEdit/types'

export const formatData = (data: CategoryFormType, parentUID) =>
  data.groups && data.groups.length !== 0
    ? {
        ...data,
        parentPath: data.parentUID ? data.parentUID : parentUID,
        groups: data.groups?.map(group => ({
          ...group,
          properties: group.properties?.map(prop =>
            prop.listOfValues && prop.listOfValues.length !== 0
              ? {
                  ...prop,
                  listOfValues: prop.listOfValues.map(value => value.value)
                }
              : { ...prop }
          )
        }))
      }
    : {
        ...data,
        uid: data?.uid,
        image: data?.image,
        systemType: data?.systemType,
        name: data?.name,
        code: data?.code,
        parentUID: data.parentUID ? data?.parentUID : parentUID,
        physicalItemProperties: data?.physicalItemProperties?.map(prop =>
          prop.listOfValues && prop.listOfValues.length !== 0
            ? {
                ...prop,
                listOfValues: prop.listOfValues.map(value => value.value)
              }
            : { ...prop }
        )
      }
