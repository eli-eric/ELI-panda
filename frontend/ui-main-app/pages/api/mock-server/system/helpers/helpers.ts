import fs from 'fs'

export const jsonWrite = async (path, jsonData, res) => {
  fs.writeFile(path, JSON.stringify(jsonData), error => {
    if (error) {
      res.status(500).json({ message: 'Error updating JSON file' })
    }
  })
}

export const updateTreeObject = (systemTree, uid, newData) => {
  if (!systemTree || !uid || !newData) {
    return
  }
  for (let i = 0; i < systemTree.length; i++) {
    if (systemTree[i].uid == uid) {
      for (let key in newData) {
        console.log(systemTree[i][key])
        systemTree[i][key] = newData[key]
      }
      return
    }
    if (systemTree[i].children) {
      updateTreeObject(systemTree[i].children, uid, newData)
    }
  }
}

export const updateSystemObject = (systems, uid, newData) => {
  const systemIndex = systems.findIndex(item => item.uid === uid)
  console.log(systemIndex)
  for (let key in newData) {
    systems[systemIndex][key] = newData[key]
  }
}

export const generateUid = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5)

export const deleteTreeObject = (systemTree, uid) => {
  if (!systemTree || !uid) {
    return
  }
  for (let i = 0; i < systemTree.length; i++) {
    if (systemTree[i].uid == uid) {
      systemTree.splice(i, 1)
      return
    }
    if (systemTree[i].children) {
      deleteTreeObject(systemTree[i].children, uid)
      // check if the parent node has no other children
      if (systemTree[i].children.length === 0) {
        delete systemTree[i].children
      }
    }
  }
  return
}

export const addTreeObject = (systemTree, uid, newChild) => {
  if (!systemTree || !uid) {
    return
  }
  for (let i = 0; i < systemTree.length; i++) {
    if (systemTree[i].uid === uid) {
      if (!systemTree[i].children) {
        systemTree[i].children = []
      }
      systemTree[i].children.push({ ...newChild, systemCode: 'test' })
      return
    }
    if (systemTree[i].children) {
      addTreeObject(systemTree[i].children, uid, newChild)
    }
  }
  return
}

export const getTreeObject = (systemTree, uid) => {
  if (!systemTree || !uid) {
    return
  }
  for (let i = 0; i < systemTree.length; i++) {
    if (systemTree[i].uid == uid) {
      return systemTree[i]
    }
    if (systemTree[i].children) {
      getTreeObject(systemTree[i].children, uid)
    }
  }
  return
}
