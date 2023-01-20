import { createContext, useEffect, useState } from 'react'
interface FormContext {
  edit: boolean
  add: boolean
  uid: string | undefined
  setUid: (_uid: string | undefined) => void

  setEdit: (_edit: boolean) => void
  setAdd: (_add: boolean) => void
}

const FormContext = createContext({
  edit: false,
  add: false,
  uid: undefined,
  setEdit: _edit => {},
  setAdd: _add => {},
  setUid: _uid => {}
} as FormContext)

interface Props {
  children: React.ReactNode
}

export const FormContextProvider = ({ children }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [add, setAdd] = useState<boolean>(false)
  const [uid, setUid] = useState<string | undefined>(undefined)

  useEffect(() => {
    console.log(edit, add, uid)
  }, [edit, add, uid])

  const setEditHandler = (edit: boolean) => {
    setAdd(false)
    setEdit(edit)
  }
  const setAddHandler = (add: boolean) => {
    setEdit(false)
    setAdd(add)
  }
  const setUidHandler = (uid: string | undefined) => {
    setUid(uid)
  }
  const context = {
    uid,
    setUid: setUidHandler,
    edit,
    setEdit: setEditHandler,
    add,
    setAdd: setAddHandler
  }

  return <FormContext.Provider value={context}>{children}</FormContext.Provider>
}
export default FormContext
